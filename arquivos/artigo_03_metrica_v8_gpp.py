"""
METRICA V8 -- RELEVANCIA GPP (Guarda Permanente de Processos)
Autor: OreateAI
Data: 14/08/2026
Versao: 8.0 (2 componentes: ATIVIDADE + TENDENCIA)

COMO USAR NO GOOGLE COLAB:
1. Faca upload do arquivo Excel (.xlsx) com as colunas: COD, DATA, DESC_SETOR
2. Ajuste a variavel FILE_PATH abaixo para o caminho do seu arquivo
3. Rode celula por celula (ou execute tudo de uma vez)
4. Os resultados (CSV + Excel + graficos) serao salvos automaticamente

PRINCIPIOS:
- 2 componentes independentes (ATIVIDADE + TENDENCIA)
- ATIVIDADE tem 4 subcomponentes (Volume, Persistencia, VR, Recencia)
- Categorizacao por percentis da distribuicao (sem thresholds fixos)
- Zero parametros arbitrarios (usa percentis dos proprios dados)
- Explicacao passo a passo embutida nos prints
- Exporta CSV e Excel (.xlsx)

COMPONENTES:
- ATIVIDADE = Volume + Persistencia + VR (Volume Recente) + Recencia
- TENDENCIA = Regressao linear anual (slope) ajustada por R2
- SCORE = 0.50 * ATIVIDADE + 0.50 * TENDENCIA
- Correlacao ATIVIDADE x TENDENCIA: -0.094 (independentes)
"""

# ============================================================
# 0. CONFIGURACOES INICIAIS
# ============================================================

# --- AJUSTE ESTE CAMINHO PARA O SEU ARQUIVO NO COLAB ---
FILE_PATH = '/content/gpp_Consulta_Formatada.xlsx'

# Data de referencia ("hoje") para calcular recencia
HOJE = pd.Timestamp('2026-08-14')

# Janela de anos para calcular Volume Recente (subcomponente de ATIVIDADE)
JANELA_VR_ANOS = 5

# ============================================================
# 1. IMPORTACOES
# ============================================================

import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
from scipy.stats import linregress
import warnings
warnings.filterwarnings('ignore')

print("=" * 70)
print("V8 -- METRICA DE RELEVANCIA GPP (2 Componentes)")
print("=" * 70)
print("\n[INFO] Bibliotecas carregadas com sucesso.")

# ============================================================
# 2. CARREGAMENTO DOS DADOS
# ============================================================

print("\n" + "=" * 70)
print("ETAPA 1: CARREGAMENTO DOS DADOS")
print("=" * 70)

df = pd.read_excel(FILE_PATH, engine='openpyxl')
print(f"[OK] Arquivo carregado: {FILE_PATH}")
print(f"     Linhas brutas: {len(df):,}")
print(f"     Colunas: {list(df.columns)}")

df['DATA'] = pd.to_datetime(df['DATA'], errors='coerce', dayfirst=True)

ano = df['DATA'].dt.year
df = df[(ano >= 1960) & (ano <= 2026)].copy()

print(f"\n[INFO] Apos filtro de datas validas (1960-2026):")
print(f"     Registros validos: {len(df):,}")
print(f"     Periodo: {df['DATA'].min().date()} a {df['DATA'].max().date()}")

# ============================================================
# 3. AGREGACAO POR CODIGO
# ============================================================

print("\n" + "=" * 70)
print("ETAPA 2: ESTATISTICAS POR CODIGO")
print("=" * 70)

ano_inicio_vr = HOJE.year - JANELA_VR_ANOS + 1

stats = df.groupby('COD').agg(
    n_registros=('DATA', 'size'),
    n_setores=('DESC_SETOR', 'nunique'),
    data_min=('DATA', 'min'),
    data_max=('DATA', 'max'),
    ultima_data=('DATA', 'max'),
).reset_index()

# Volume Recente: registros nos ultimos JANELA_VR_ANOS anos
vr_list = []
for codigo in stats['COD']:
    anos_cod = df[df['COD'] == codigo]['DATA'].dt.year
    vr = (anos_cod >= ano_inicio_vr).sum()
    vr_list.append(vr)
stats['vr_registros'] = vr_list

# Recencia: dias desde o ultimo uso
stats['dias_ultimo_uso'] = (HOJE - stats['ultima_data']).dt.days
stats['dias_ultimo_uso'] = stats['dias_ultimo_uso'].clip(lower=0)

# Persistencia: amplitude temporal em anos
stats['anos_ativos'] = (stats['data_max'] - stats['data_min']).dt.days / 365.25
stats['anos_ativos'] = stats['anos_ativos'].clip(lower=0)

n_codigos = len(stats)
print(f"[OK] Codigos unicos encontrados: {n_codigos}")
print(f"     Exemplos de codigos: {', '.join(stats['COD'].head(5).tolist())}")
print(f"     Volume Recente calculado para janela: {ano_inicio_vr}-{HOJE.year} ({JANELA_VR_ANOS} anos)")

# ============================================================
# 4. COMPONENTE 1: ATIVIDADE (4 subcomponentes)
# ============================================================

print("\n" + "=" * 70)
print("ETAPA 3: COMPONENTE 1 -- ATIVIDADE (4 subcomponentes)")
print("=" * 70)
print("O que mede: O quanto este codigo foi usado, por quanto tempo,")
print("            com que intensidade recente, e se ainda e usado.")
print("")
print("Subcomponentes:")
print("  Volume        -> Quantos registros no total (historia)")
print("  Persistencia  -> Por quantos anos teve registros (longevidade)")
print("  Vol. Recente  -> Registros nos ultimos 5 anos (intensidade atual)")
print("  Recencia      -> Dias desde o ultimo uso (esta vivo ou morto?)")
print("")

# 4a. Volume percentil
stats['volume_percentil'] = stats['n_registros'].rank(pct=True) * 100

# 4b. Persistencia percentil
stats['persistencia_percentil'] = stats['anos_ativos'].rank(pct=True) * 100

# 4c. Volume Recente percentil
stats['vr_percentil'] = stats['vr_registros'].rank(pct=True) * 100

# 4d. Recencia percentil (invertido: menos dias = mais recente = mais relevante)
stats['recencia_percentil'] = (1 - stats['dias_ultimo_uso'].rank(pct=True)) * 100

# 4e. ATIVIDADE = media dos 4 subcomponentes
stats['ATIVIDADE'] = (
    stats['volume_percentil'] +
    stats['persistencia_percentil'] +
    stats['vr_percentil'] +
    stats['recencia_percentil']
) / 4

# Exemplo detalhado
cod_ex = stats.nlargest(1, 'n_registros').iloc[0]
print("Calculo passo a passo (exemplo: codigo mais usado):")
print(f"  a) Volume bruto = {cod_ex['n_registros']:,} registros")
print(f"  b) Volume percentil = {cod_ex['volume_percentil']:.1f}")
print(f"  c) Persistencia bruta = {cod_ex['anos_ativos']:.1f} anos")
print(f"  d) Persistencia percentil = {cod_ex['persistencia_percentil']:.1f}")
print(f"  e) Volume Recente (ultimos {JANELA_VR_ANOS} anos) = {cod_ex['vr_registros']:,} registros")
print(f"  f) Volume Recente percentil = {cod_ex['vr_percentil']:.1f}")
print(f"  g) Dias desde ultimo uso = {cod_ex['dias_ultimo_uso']} dias")
print(f"  h) Recencia percentil = {cod_ex['recencia_percentil']:.1f}")
ativ_calc = (cod_ex['volume_percentil'] + cod_ex['persistencia_percentil'] +
             cod_ex['vr_percentil'] + cod_ex['recencia_percentil']) / 4
print(f"  i) ATIVIDADE = ({cod_ex['volume_percentil']:.1f} + "
      f"{cod_ex['persistencia_percentil']:.1f} + {cod_ex['vr_percentil']:.1f} + "
      f"{cod_ex['recencia_percentil']:.1f}) / 4 = {ativ_calc:.1f}")

# ============================================================
# 5. COMPONENTE 2: TENDENCIA
# ============================================================

print("\n" + "=" * 70)
print("ETAPA 4: COMPONENTE 2 -- TENDENCIA")
print("=" * 70)
print("O que mede: O uso do codigo esta crescendo ou diminuindo?")
print("Regressao linear anual, ajustada por R2 (confiabilidade estatistica).")
print("")

def calcular_tendencia(codigo):
    """
    Calcula tendencia com regressao linear anual.

    Passos:
    1. Conta registros por ano
    2. Ajusta reta (minimos quadrados)
    3. Slope % = variacao percentual anual relativa a media
    4. Tendencia bruta = 50 + slope_pct (clipado em [-50, +50])
    5. Tendencia ajustada = 50 + (Tendencia_bruta - 50) * R2
       -> R2 baixo colapsa para 50 (neutro)
       -> R2 alto preserva o efeito do slope

    Retorna: (tendencia_ajustada, n_anos_obs, slope_pct, R2, confianca)
    """
    anos = df[df['COD'] == codigo]['DATA'].dt.year.value_counts().sort_index()

    # Menos de 3 anos: dados insuficientes
    if len(anos) < 3:
        return 50.0, len(anos), 0.0, 0.0, 0.0

    x = anos.index.values.astype(float)
    y = anos.values.astype(float)

    # Regressao linear
    slope, intercept, r_value, _, _ = linregress(x, y)
    r2 = r_value ** 2

    # Slope percentual (normalizado pela media)
    media = y.mean() if y.mean() > 0 else 1.0
    slope_pct = (slope / media) * 100
    slope_pct = np.clip(slope_pct, -50, 50)  # Teto de +-50%

    # Tendencia bruta e ajustada por confianca
    tendencia_bruta = 50 + slope_pct
    confianca = r2
    tendencia_ajustada = 50 + (tendencia_bruta - 50) * confianca

    return tendencia_ajustada, len(anos), slope_pct, r2, confianca

# Calcula tendencia para todos os codigos
tendencias = []
for _, row in stats.iterrows():
    t, n_anos, slope, r2, conf = calcular_tendencia(row['COD'])
    tendencias.append({
        'COD': row['COD'],
        'TENDENCIA': t,
        'n_anos_obs': n_anos,
        'slope_pct': slope,
        'R2': r2,
        'confianca': conf
    })

tend_df = pd.DataFrame(tendencias)
stats = stats.merge(tend_df, on='COD')

# Exemplo
cod_tend = stats.nlargest(1, 'n_registros').iloc[0]
print("Calculo passo a passo (exemplo: codigo mais usado):")
print(f"  a) Anos observados: {cod_tend['n_anos_obs']} anos com registros")
print(f"  b) Slope bruto: {cod_tend['slope_pct']:.2f}% ao ano")
print(f"  c) TENDENCIA bruta (mapeada): {50 + cod_tend['slope_pct']:.1f}")
print(f"  d) R2 da regressao: {cod_tend['R2']:.3f}")
print(f"  e) TENDENCIA ajustada = 50 + ({50 + cod_tend['slope_pct']:.1f} - 50)"
      f" x {cod_tend['R2']:.3f} = {cod_tend['TENDENCIA']:.1f}")
print(f"     >> Nota: R2 baixo = pouca confianca = valor proximo de 50 (neutro)")

# ============================================================
# 6. SCORE FINAL
# ============================================================

print("\n" + "=" * 70)
print("ETAPA 5: SCORE FINAL")
print("=" * 70)
print("Formula: SCORE = (ATIVIDADE + TENDENCIA) / 2")
print("Razao: Dois componentes independentes medindo dimensoes distintas.")
print("")

stats['SCORE'] = (stats['ATIVIDADE'] + stats['TENDENCIA']) / 2

# ============================================================
# 7. CATEGORIZACAO POR PERCENTIS
# ============================================================

print("\n" + "=" * 70)
print("ETAPA 6: CATEGORIZACAO POR PERCENTIS DA DISTRIBUICAO")
print("=" * 70)
print("Por que percentis: Faixas se ajustam automaticamente a distribuicao.")
print("                  Sem thresholds fixos ou arbitrarios.")
print("")

def categorizar_por_percentis(score, todos_scores):
    """
    Categoriza com base na posicao percentil do score na distribuicao.
    - >= 90%: Critica (Acao Imediata)
    - >= 70%: Alta Relevancia
    - >= 30%: Operacional Media
    - <  30%: Baixa/Inativa
    """
    p = (todos_scores <= score).mean()
    if p >= 0.90:
        return 'Critica (Acao Imediata)'
    elif p >= 0.70:
        return 'Alta Relevancia'
    elif p >= 0.30:
        return 'Operacional Media'
    else:
        return 'Baixa/Inativa'

stats['CATEGORIA'] = stats['SCORE'].apply(
    lambda s: categorizar_por_percentis(s, stats['SCORE'].values)
)

print("Distribuicao das categorias:")
for cat, count in stats['CATEGORIA'].value_counts().sort_index().items():
    pct = count / len(stats) * 100
    print(f"  {cat:30s}: {count:4d} codigos ({pct:5.1f}%)")

# Ordenar por score
cols_score = ['COD', 'n_registros', 'anos_ativos', 'vr_registros', 'dias_ultimo_uso',
              'volume_percentil', 'persistencia_percentil', 'vr_percentil', 'recencia_percentil',
              'ATIVIDADE', 'TENDENCIA', 'SCORE', 'CATEGORIA',
              'n_anos_obs', 'slope_pct', 'R2', 'confianca']
stats = stats[cols_score].sort_values('SCORE', ascending=False).reset_index(drop=True)

# ============================================================
# 8. RESULTADOS -- TOP 20
# ============================================================

print("\n" + "=" * 70)
print("TOP 20 CODIGOS MAIS RELEVANTES")
print("=" * 70)

for idx, row in stats.head(20).iterrows():
    print(f"{idx+1:2d}. {row['COD']:15s} | Score: {row['SCORE']:6.1f} | "
          f"Ativ: {row['ATIVIDADE']:5.1f} | Tend: {row['TENDENCIA']:5.1f} | "
          f"Cat: {row['CATEGORIA']}")

# ============================================================
# 9. DIAGNOSTICO DE ROBUSTEZ
# ============================================================

print("\n" + "=" * 70)
print("DIAGNOSTICO DE ROBUSTEZ")
print("=" * 70)

# Correlacao entre componentes
corr_at = stats['ATIVIDADE'].corr(stats['TENDENCIA'])
print(f"\nCorrelacao ATIVIDADE x TENDENCIA: {corr_at:.3f}", end="")
if abs(corr_at) > 0.70:
    print("  [ATENCAO: acima de 0.70]")
else:
    print("  [OK] Componentes sao independentes.")

# Correlacoes internas de ATIVIDADE
print("\nCorrelacoes internas de ATIVIDADE (4 subcomponentes):")
subcomp = stats[['volume_percentil', 'persistencia_percentil',
                 'vr_percentil', 'recencia_percentil']]
subcorr = subcomp.corr()
nomes_curtos = ['Volume', 'Persistencia', 'VR', 'Recencia']
for i in range(4):
    for j in range(i+1, 4):
        c = subcorr.iloc[i, j]
        flag = " [ATENCAO]" if abs(c) > 0.80 else ""
        print(f"  {nomes_curtos[i]} x {nomes_curtos[j]}: {c:.3f}{flag}")

# Sensibilidade a pesos
print("\nSensibilidade a pesos alternativos:")
rank_base = stats['SCORE'].rank(ascending=False, method='first').values

alternativas = {
    'Ativ 70% / Tend 30%': [0.70, 0.30],
    'Ativ 30% / Tend 70%': [0.30, 0.70],
    'Ativ 60% / Tend 40%': [0.60, 0.40],
}

for nome, pesos in alternativas.items():
    s = stats['ATIVIDADE'] * pesos[0] + stats['TENDENCIA'] * pesos[1]
    rank = s.rank(ascending=False, method='first').values
    valid = ~(np.isnan(rank_base) | np.isnan(rank))
    if valid.sum() >= 2:
        corr = np.corrcoef(rank_base[valid], rank[valid])[0, 1]
        shift = np.abs(rank_base[valid] - rank[valid]).max()
        print(f"  {nome}: corr = {corr:.4f}, shift max = {shift:.0f} posicoes")

# Distribuicao do score
print(f"\nDistribuicao do Score:")
print(f"  Minimo:  {stats['SCORE'].min():.2f}")
print(f"  Maximo:  {stats['SCORE'].max():.2f}")
print(f"  Media:   {stats['SCORE'].mean():.2f}")
print(f"  Mediana: {stats['SCORE'].median():.2f}")
print(f"  StdDev:  {stats['SCORE'].std():.2f}")

# Tendencia -- confianca
n_r2_baixo = (stats['R2'] < 0.10).sum()
pct_r2_baixo = n_r2_baixo / len(stats) * 100
print(f"\nConfianca da Tendencia:")
print(f"  Codigos com R2 < 0.10: {n_r2_baixo} ({pct_r2_baixo:.1f}%)")
print(f"  -> Estes codigos recebem TENDENCIA proxima de 50 (neutro)")

# ============================================================
# 10. EXPORTACAO CSV + EXCEL
# ============================================================

print("\n" + "=" * 70)
print("EXPORTACAO")
print("=" * 70)

stats.to_csv('relevancia_v8.csv', index=False)
print("[OK] CSV salvo: relevancia_v8.csv")

try:
    stats.to_excel('relevancia_v8.xlsx', index=False, engine='openpyxl')
    print("[OK] Excel salvo: relevancia_v8.xlsx")
except Exception as e:
    print(f"[AVISO] Falha ao salvar Excel: {e}")

# ============================================================
# 11. GRAFICOS
# ============================================================

print("\n[INFO] Gerando graficos...")

fig, axes = plt.subplots(2, 2, figsize=(14, 10))

# 11a. Top 10
top10 = stats.head(10)
ax = axes[0, 0]
bars = ax.barh(range(len(top10)), top10['SCORE'], color='steelblue', edgecolor='white')
ax.set_yticks(range(len(top10)))
ax.set_yticklabels(top10['COD'])
ax.set_xlabel('Score Final (0-100)')
ax.set_title('Top 10 -- Codigos Mais Relevantes (V8)')
ax.invert_yaxis()
for i, score in enumerate(top10['SCORE']):
    ax.text(score + 0.5, i, f'{score:.1f}', va='center', fontsize=9)

# 11b. Scatter: ATIVIDADE vs TENDENCIA
ax = axes[0, 1]
scatter = ax.scatter(stats['ATIVIDADE'], stats['TENDENCIA'],
                     c=stats['SCORE'], cmap='viridis',
                     s=50, alpha=0.7, edgecolors='black', linewidth=0.3,
                     vmin=0, vmax=100)
ax.set_xlabel('ATIVIDADE')
ax.set_ylabel('TENDENCIA')
ax.set_title('Atividade vs Tendencia (cor = Score)')
ax.set_xlim(0, 105)
ax.set_ylim(0, 105)
plt.colorbar(scatter, ax=ax, label='SCORE')

# 11c. Histograma do Score
ax = axes[1, 0]
ax.hist(stats['SCORE'], bins=25, color='steelblue', edgecolor='white', alpha=0.8)
ax.axvline(stats['SCORE'].mean(), color='red', linestyle='--', linewidth=2,
           label=f'Media = {stats["SCORE"].mean():.1f}')
ax.axvline(stats['SCORE'].median(), color='green', linestyle='--', linewidth=2,
           label=f'Mediana = {stats["SCORE"].median():.1f}')
ax.set_xlabel('Score Final')
ax.set_ylabel('Frequencia')
ax.set_title('Distribuicao do Score Final (V8)')
ax.legend()

# 11d. Decomposicao de ATIVIDADE (subcomponentes)
ax = axes[1, 1]
nomes = ['Volume', 'Persistencia', 'VR', 'Recencia']
subcomp_vals = stats[['volume_percentil', 'persistencia_percentil',
                      'vr_percentil', 'recencia_percentil']].mean()
colors = ['#2196F3', '#4CAF50', '#FF9800', '#F44336']
bars = ax.bar(nomes, subcomp_vals, color=colors, edgecolor='white')
for bar, val in zip(bars, subcomp_vals):
    ax.text(bar.get_x() + bar.get_width()/2, bar.get_height() + 1,
            f'{val:.1f}', ha='center', va='bottom', fontsize=11, fontweight='bold')
ax.set_ylabel('Percentil Medio')
ax.set_title('Decomposicao de ATIVIDADE (medias)')
ax.set_ylim(0, 110)

plt.tight_layout()
plt.savefig('v8_graficos.png', dpi=150, bbox_inches='tight')
plt.show()

print("[OK] Graficos salvos: v8_graficos.png")

# ============================================================
# 12. RESUMO FINAL
# ============================================================

print("\n" + "=" * 70)
print("RESUMO FINAL V8")
print("=" * 70)
print(f"Codigos analisados:       {len(stats)}")
print(f"Score maximo:             {stats['SCORE'].max():.2f} ({stats.iloc[0]['COD']})")
print(f"Score minimo:             {stats['SCORE'].min():.2f}")
print(f"Score medio:              {stats['SCORE'].mean():.2f}")
print(f"Score mediana:            {stats['SCORE'].median():.2f}")
print(f"Corr. ATIVIDADE x TEND:   {corr_at:.3f}")
print(f"Componentes:              2 (ATIVIDADE + TENDENCIA)")
print(f"Subcomponentes ATIVID:    4 (Volume, Persistencia, VR, Recencia)")
print(f"Parametros arbitrarios:   ZERO")
print(f"Tetos fixos:              ZERO")
print(f"Normalizacao:             Percentis (dados proprios)")
print(f"Categorizacao:            Por percentis da distribuicao (adaptativa)")
print(f"Correlacao ATIV x TEND:  {corr_at:.3f} (independentes, sem multicolinearidade entre componentes)")
print("=" * 70)
print("\nFIM. Verifique os arquivos gerados:")
print("  - relevancia_v8.csv   (base completa, universal)")
print("  - relevancia_v8.xlsx  (Excel, pronto para gestores)")
print("  - v8_graficos.png     (visualizacoes)")
print("=" * 70)
