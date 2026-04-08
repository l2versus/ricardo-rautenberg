import type { Metadata } from "next";
import Image from "next/image";
import "./manual.css";

export const metadata: Metadata = {
  title: "Manual do Site | Ricardo Rautenberg",
  robots: { index: false, follow: false },
};

export default function ManualPage() {
  return (
    <div className="manual">
      {/* ── CAPA ── */}
      <div className="manual-cover">
        <Image
          src="/images/logo-full.png"
          alt="Ricardo Rautenberg"
          width={180}
          height={60}
          className="manual-cover-logo"
          style={{ objectFit: "contain" }}
          unoptimized
        />
        <div className="manual-cover-title">Manual do Site</div>
        <div className="manual-cover-subtitle">Guia completo de uso e identidade</div>
        <Image
          src="/images/ricardo-dark.jpg"
          alt="Ricardo Rautenberg"
          width={180}
          height={180}
          className="manual-cover-photo"
          unoptimized
        />
        <div className="manual-cover-name">Ricardo Rautenberg</div>
        <div className="manual-cover-creci">Corretor de Imóveis · CRECI SP 299919</div>
        <div className="manual-cover-date">Abril 2026 · ricardorautenberg.com.br</div>
      </div>

      {/* ── CONTEÚDO ── */}
      <div className="manual-content">

        {/* 01 — IDENTIDADE VISUAL */}
        <div className="manual-section">
          <div className="manual-section-number">01</div>
          <div className="manual-section-title">Identidade Visual</div>
          <p className="manual-section-intro">
            Seu site foi criado para transmitir sofisticação, confiança e exclusividade —
            o mesmo padrão das maiores imobiliárias de luxo do mundo.
          </p>

          <div className="manual-palette">
            <div className="manual-swatch">
              <div className="manual-swatch-color" style={{ background: "#0A0A0A" }} />
              <div className="manual-swatch-name">Preto Noturno</div>
              <div className="manual-swatch-hex">#0A0A0A</div>
            </div>
            <div className="manual-swatch">
              <div className="manual-swatch-color" style={{ background: "linear-gradient(135deg,#B8942F,#E5D5A0,#C9A84C)" }} />
              <div className="manual-swatch-name">Dourado Exclusivo</div>
              <div className="manual-swatch-hex">#C9A84C</div>
            </div>
            <div className="manual-swatch">
              <div className="manual-swatch-color" style={{ background: "#F5F5F0", border: "1px solid rgba(255,255,255,0.15)" }} />
              <div className="manual-swatch-name">Branco Marfim</div>
              <div className="manual-swatch-hex">#F5F5F0</div>
            </div>
            <div className="manual-swatch">
              <div className="manual-swatch-color" style={{ background: "#1A1A1A" }} />
              <div className="manual-swatch-name">Grafite</div>
              <div className="manual-swatch-hex">#1A1A1A</div>
            </div>
          </div>

          <div className="manual-highlight">
            <strong>Regra de ouro:</strong> Nunca altere as cores do site. O contraste entre o preto profundo e o dourado é o que cria a percepção de alto padrão. Adicionar outras cores quebra a harmonia visual e desvaloriza a marca.
          </div>

          <div className="manual-divider" />

          <div className="manual-cards">
            <div className="manual-card">
              <div className="manual-card-icon">✦</div>
              <div className="manual-card-title">Tipografia dos Títulos</div>
              <div className="manual-card-text">Playfair Display — fonte com serifa, estilo editorial e elegante. Usada em todos os títulos e destaques do site.</div>
            </div>
            <div className="manual-card">
              <div className="manual-card-icon">✦</div>
              <div className="manual-card-title">Tipografia dos Textos</div>
              <div className="manual-card-text">Inter — fonte moderna, clean e de fácil leitura. Usada em descrições, botões e informações técnicas.</div>
            </div>
            <div className="manual-card">
              <div className="manual-card-icon">✦</div>
              <div className="manual-card-title">Tom de Comunicação</div>
              <div className="manual-card-text">Discreto, sofisticado e direto. Sem exageros. O cliente de alto padrão valoriza a elegância no silêncio.</div>
            </div>
            <div className="manual-card">
              <div className="manual-card-icon">✦</div>
              <div className="manual-card-title">Referências de Mercado</div>
              <div className="manual-card-text">Axpe Imóveis, Sotheby&apos;s Realty, LEF Properties. Mesmo posicionamento visual e de marca.</div>
            </div>
          </div>
        </div>

        {/* 02 — O QUE TEM NO SITE */}
        <div className="manual-section">
          <div className="manual-section-number">02</div>
          <div className="manual-section-title">O Que Existe no Site Hoje</div>
          <p className="manual-section-intro">
            Seu site está completo e funcional, com todas as páginas que um corretor de alto padrão precisa.
          </p>
          <div className="manual-list">
            {[
              ["Página Inicial", "Apresentação com vídeo de fundo, sua foto, slogan e botão direto para o WhatsApp."],
              ["Galeria de Imóveis", "Listagem de todos os imóveis cadastrados, com foto, preço, localização e filtros por tipo."],
              ["Página do Imóvel", "Galeria de fotos em destaque, vídeo do YouTube embutido, comodidades, metragem, quartos, vagas e botão de WhatsApp para aquele imóvel específico."],
              ["Tour Virtual", "Página especial com vídeo do tour, scroll animado e categorias de imóveis por tipo."],
              ["Página Sobre", "Seu perfil profissional, número do CRECI e foto."],
              ["Contato", "Página com WhatsApp, telefone e Instagram."],
              ["Painel Administrativo", "Área exclusiva para você cadastrar, editar e remover imóveis sem precisar de ninguém."],
              ["SEO Configurado", "O site já aparece no Google com título, descrição e imagens otimizadas por imóvel."],
              ["100% Responsivo", "Funciona perfeitamente em celular, tablet e computador."],
            ].map(([title, desc]) => (
              <div key={title} className="manual-list-item">
                <span className="manual-list-dash">—</span>
                <span><span className="manual-list-strong">{title}</span> — {desc}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 03 — COMO CADASTRAR */}
        <div className="manual-section">
          <div className="manual-section-number">03</div>
          <div className="manual-section-title">Como Cadastrar um Imóvel</div>
          <p className="manual-section-intro">O processo é simples e direto. Você não precisa de nenhum conhecimento técnico.</p>
          <div className="manual-steps">
            {[
              ["Acesse o painel admin", <>Vá em <span className="manual-step-url">ricardorautenberg.com.br/admin/login</span> e entre com seu e-mail e senha. Essa área é exclusiva sua.</>],
              ['Clique em \u201cNovo Im\u00F3vel\u201d', "No painel, clique no botão dourado no canto superior direito."],
              ["Preencha as informações", "Título, tipo (apartamento, cobertura, casa...), endereço, preço, número de quartos, banheiros, vagas e metragem. Também há campo para comodidades separadas por vírgula (ex: Piscina, Academia, Portaria 24h)."],
              ["Faça upload das fotos", "Clique em \"Adicionar Fotos\" e selecione as imagens do imóvel no seu celular ou computador. Você pode adicionar várias de uma vez. A primeira foto será a capa."],
              ["Cole o link do vídeo (opcional)", "Se tiver um vídeo do imóvel no YouTube, cole o link no campo \"URL do Vídeo\". Ele vai aparecer automaticamente na página."],
              ['Clique em \u201cSalvar Im\u00F3vel\u201d', "O imóvel aparece instantaneamente no site. Você pode editar ou remover a qualquer momento."],
            ].map(([title, desc], i) => (
              <div key={i} className="manual-step">
                <div className="manual-step-num">{i + 1}</div>
                <div>
                  <div className="manual-step-title">{title}</div>
                  <div className="manual-step-text">{desc}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="manual-highlight" style={{ marginTop: 32 }}>
            <strong>Dica:</strong> Para imóveis off-market (exclusivos, não divulgados publicamente), marque a opção &quot;Off Market&quot; no formulário. O imóvel fica salvo no sistema mas não aparece para visitantes.
          </div>
        </div>

        {/* 04 — FOTOS */}
        <div className="manual-section">
          <div className="manual-section-number">04</div>
          <div className="manual-section-title">Fotos — Formatos e Boas Práticas</div>
          <p className="manual-section-intro">A qualidade das fotos é o principal fator de conversão em imóveis de alto padrão. Uma boa foto vende antes da visita.</p>

          <table className="manual-table">
            <thead>
              <tr>
                <th>Especificação</th>
                <th>Aceito</th>
                <th>Recomendado</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Formato", "JPG, PNG, WebP", "JPG (melhor equilíbrio entre qualidade e tamanho)"],
                ["Tamanho máximo", "10MB por foto", "Entre 2MB e 6MB"],
                ["Orientação", "Qualquer", "Horizontal (paisagem) — 4:3 ou 16:9"],
                ["Resolução mínima", "Sem limite", "1920×1080 pixels ou superior"],
                ["Quantidade por imóvel", "Sem limite", "Entre 8 e 20 fotos"],
              ].map(([spec, aceito, rec]) => (
                <tr key={spec}>
                  <td>{spec}</td>
                  <td>{aceito}</td>
                  <td>{rec}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="manual-divider" />

          <div className="manual-list">
            {[
              "Fotografe sempre com boa iluminação natural — abra cortinas e persianas antes de fotografar.",
              "Ambientes arrumados e sem objetos pessoais visíveis transmitem mais valor.",
              "Comece com a foto mais impactante: vista, sala de estar ou terraço.",
              "Inclua fotos da fachada do prédio, áreas comuns e vista da janela.",
              "Para imóveis de alto padrão, considere contratar um fotógrafo especializado em arquitetura.",
              "Fotos verticais (celular em pé) aparecem cortadas na galeria. Prefira o modo paisagem.",
            ].map((item, i) => (
              <div key={i} className="manual-list-item">
                <span className="manual-list-dash">—</span>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 05 — VÍDEOS */}
        <div className="manual-section">
          <div className="manual-section-number">05</div>
          <div className="manual-section-title">Vídeos — Como Publicar no Site</div>
          <p className="manual-section-intro">O site não recebe vídeos diretamente — os vídeos são publicados pelo YouTube e exibidos automaticamente.</p>
          <div className="manual-steps">
            {[
              ["Grave o vídeo do imóvel", "Use seu celular ou câmera em modo paisagem (horizontal). Faça um tour fluido: fachada → sala → cozinha → quartos → banheiros → varanda/vista."],
              ["Suba o vídeo no YouTube", "Acesse youtube.com, clique em \"Criar\" → \"Fazer upload\". Você pode deixar como Não listado — assim só quem tiver o link consegue assistir."],
              ["Copie o link do vídeo", "No YouTube, clique em \"Compartilhar\" e copie o link. Ficará assim: youtube.com/watch?v=XXXXXXXXXXX"],
              ["Cole no cadastro do imóvel", "No painel admin, ao cadastrar ou editar o imóvel, cole o link no campo \"URL do Vídeo\". O vídeo aparece automaticamente na página."],
            ].map(([title, desc], i) => (
              <div key={i} className="manual-step">
                <div className="manual-step-num">{i + 1}</div>
                <div>
                  <div className="manual-step-title">{title}</div>
                  <div className="manual-step-text">{desc}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="manual-highlight" style={{ marginTop: 32 }}>
            <strong>Formatos para gravar:</strong> MP4 e MOV — qualquer celular atual grava nesses formatos. Resolução mínima recomendada: <strong>1080p (Full HD)</strong>. Duração ideal de um tour: entre <strong>1 e 3 minutos</strong>.
          </div>
        </div>

        {/* 06 — FUTURO */}
        <div className="manual-section">
          <div className="manual-section-number">06</div>
          <div className="manual-section-title">O Que Podemos Agregar</div>
          <p className="manual-section-intro">Seu site tem uma base sólida. Se quiser continuar evoluindo, estas são as expansões mais valiosas.</p>
          <div className="manual-future-grid">
            {[
              ["🏠", "Tour Virtual 360°", "Integração com Matterport. O cliente caminha pelo imóvel sem sair de casa. Diferencial competitivo enorme."],
              ["📝", "Blog Imobiliário", "Artigos sobre o mercado do ABC Paulista para aparecer no Google e atrair compradores que ainda pesquisam."],
              ["📅", "Agendamento Online", "Calendário integrado ao site. O cliente agenda a visita direto, sem precisar ligar."],
              ["🔗", "Portais Integrados", "Publicação automática no ZAP, OLX e Viva Real. Cadastra uma vez, aparece em todo lugar."],
              ["⭐", "Depoimentos de Clientes", "Seção com avaliações de clientes satisfeitos. Prova social é o maior gatilho de confiança."],
              ["🧮", "Calculadora de Financiamento", "O cliente digita o preço e vê quanto pagaria por mês. Reduz a barreira de entrada."],
              ["🗺️", "Mapa Interativo", "Todos os imóveis em um mapa. Quem busca por bairro encontra mais rápido."],
              ["🔒", "Área VIP / Off-Market", "Acesso exclusivo para clientes selecionados verem imóveis que não aparecem para o público geral."],
              ["💬", "Chatbot WhatsApp", "Resposta automática 24h para quem manda mensagem fora do horário comercial."],
              ["📊", "Relatório de Visitas", "Dashboard mostrando quantas pessoas visitaram cada imóvel e de onde vieram."],
            ].map(([icon, title, desc]) => (
              <div key={title} className="manual-future-item">
                <div className="manual-future-icon">{icon}</div>
                <div>
                  <div className="manual-future-title">{title}</div>
                  <div className="manual-future-desc">{desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 07 — DESCRIÇÕES */}
        <div className="manual-section">
          <div className="manual-section-number">07</div>
          <div className="manual-section-title">Como Escrever uma Boa Descrição</div>
          <p className="manual-section-intro">A descrição transforma um visitante em um cliente. Escreva para quem vai morar, não para quem vai comprar.</p>

          <div className="manual-highlight">
            <strong>Exemplo de descrição fraca:</strong><br />
            &quot;Apartamento com 3 quartos, 2 banheiros, 1 vaga. Bem localizado.&quot;
          </div>

          <div className="manual-highlight manual-highlight-alt">
            <strong>Exemplo de descrição forte:</strong><br />
            &quot;Apartamento de alto padrão com vista definitiva para o parque. Três suítes completas, cozinha gourmet integrada à sala de jantar, varanda com churrasqueira. Lazer completo com piscina aquecida, academia equipada e portaria 24h. A 5 minutos do Shopping ABC e com acesso rápido à Av. do Estado.&quot;
          </div>

          <div className="manual-divider" />

          <div className="manual-list">
            {[
              ["Destaque o estilo de vida,", "não só as especificações técnicas."],
              ["Mencione o bairro e os pontos de referência", "— shoppings, parques, vias de acesso."],
              ["Use palavras que transmitem valor:", "exclusivo, definitivo, reformado, alto padrão, vista privilegiada, luminoso."],
              ["Mantenha o status atualizado:", "imóvel vendido aparecendo como disponível passa sensação de abandono."],
              ["Para imóveis premium,", "omita o preço e use \"Consulte\" — gera mais contatos e conversas qualificadas."],
            ].map(([bold, rest], i) => (
              <div key={i} className="manual-list-item">
                <span className="manual-list-dash">—</span>
                <span><span className="manual-list-strong">{bold}</span> {rest}</span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* ── FECHAMENTO ── */}
      <div className="manual-closing">
        <Image
          src="/images/logo.png"
          alt="RR"
          width={72}
          height={72}
          className="manual-closing-logo"
          style={{ objectFit: "contain" }}
          unoptimized
        />
        <div className="manual-closing-text">
          Um site bem cuidado é o seu melhor corretor — trabalha 24 horas por dia, 7 dias por semana, sem folga.
        </div>
        <div className="manual-closing-sub">
          Ricardo Rautenberg · CRECI SP 299919 · ricardorautenberg.com.br
        </div>
      </div>
    </div>
  );
}
