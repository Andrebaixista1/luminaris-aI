import { useState } from 'react'

function App() {
  const [activeFeature, setActiveFeature] = useState(0)
  
  const whatsappNumber = '5511980733602'
  const whatsappMessage = encodeURIComponent('Olá! Tenho interesse nas automações de IA da Luminaris AI.')
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`

  const features = [
    {
      title: 'Automação com n8n',
      description: 'Workflows inteligentes que conectam suas ferramentas e automatizam processos repetitivos.',
      icon: '🔄'
    },
    {
      title: 'Inteligência com GPT',
      description: 'Integração com OpenAI GPT para respostas inteligentes e processamento de linguagem natural.',
      icon: '🤖'
    },
    {
      title: 'Evolution API + WhatsApp',
      description: 'Integração completa com WhatsApp através da Evolution API para automação de mensagens e atendimento.',
      icon: '💬'
    },
    {
      title: 'Soluções Personalizadas',
      description: 'Automações sob medida para as necessidades específicas do seu negócio.',
      icon: '⚡'
    }
  ]

  const benefits = [
    'Reduza custos operacionais em até 70%',
    'Economize horas de trabalho manual',
    'Aumente a precisão e elimine erros humanos',
    'Escale seu negócio sem aumentar custos'
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-luminaris-dark via-gray-900 to-black text-white overflow-x-hidden">
      {/* Header/Navbar */}
      <nav className="fixed w-full top-0 z-50 bg-black/50 backdrop-blur-md border-b border-luminaris-yellow/20">
        <div className="container max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-5">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <img src="/logo.svg" alt="Luminaris AI" className="w-10 h-10" />
              <div className="text-2xl font-bold">
                <span className="text-luminaris-yellow">Luminaris</span>
                <span className="text-white"> AI</span>
              </div>
            </div>
            <a 
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-luminaris-yellow text-black px-6 py-2 rounded-full font-semibold hover:bg-yellow-400 transition-all duration-300 hover:scale-105 animate-glow"
            >
              Fale Conosco
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-40 pb-32 px-6 sm:px-8 lg:px-12 min-h-screen flex items-center">
        <div className="container max-w-7xl mx-auto w-full">
          <div className="text-center animate-fadeIn">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-10 px-4" style={{lineHeight: '1.4'}}>
              Automatize seu Negócio
              <br />
              <span className="text-luminaris-yellow animate-glow inline-block mt-4 px-6 py-3">com Inteligência Artificial</span>
            </h1>
            <p className="text-xl sm:text-2xl text-gray-300 mb-14 max-w-3xl mx-auto leading-relaxed px-4">
              Transforme processos manuais em automações inteligentes com n8n e OpenAI GPT
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center animate-slideUp px-4">
              <a 
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-luminaris-yellow text-black px-8 py-4 rounded-full text-lg font-bold hover:bg-yellow-400 transition-all duration-300 hover:scale-110 shadow-2xl animate-glow"
              >
                🚀 Comece Agora
              </a>
              <a 
                href="#features"
                className="border-2 border-luminaris-yellow text-luminaris-yellow px-8 py-4 rounded-full text-lg font-bold hover:bg-luminaris-yellow hover:text-black transition-all duration-300"
              >
                Saiba Mais
              </a>
            </div>
          </div>

          {/* Floating Elements */}
          <div className="mt-24 relative h-64">
            <div className="absolute top-0 left-1/4 w-32 h-32 bg-luminaris-yellow/20 rounded-full blur-3xl animate-float"></div>
            <div className="absolute top-10 right-1/4 w-40 h-40 bg-yellow-500/10 rounded-full blur-3xl animate-float" style={{animationDelay: '1s'}}></div>
            <div className="absolute bottom-0 left-1/2 w-36 h-36 bg-luminaris-yellow/15 rounded-full blur-3xl animate-float" style={{animationDelay: '2s'}}></div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-32 px-6 sm:px-8 lg:px-12 bg-black/30">
        <div className="container max-w-7xl mx-auto w-full">
          <h2 className="text-4xl sm:text-5xl font-bold text-center mb-20">
            Nossas <span className="text-luminaris-yellow">Soluções</span>
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 max-w-7xl mx-auto">
            {features.map((feature, index) => (
              <div 
                key={index}
                onMouseEnter={() => setActiveFeature(index)}
                className={`p-10 rounded-2xl border-2 transition-all duration-300 cursor-pointer ${
                  activeFeature === index 
                    ? 'border-luminaris-yellow bg-luminaris-yellow/10 scale-105' 
                    : 'border-gray-700 bg-gray-900/50 hover:border-luminaris-yellow/50'
                }`}
              >
                <div className="text-6xl mb-6">{feature.icon}</div>
                <h3 className="text-2xl font-bold mb-6 text-luminaris-yellow">{feature.title}</h3>
                <p className="text-gray-300 text-lg leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-32 px-6 sm:px-8 lg:px-12">
        <div className="container max-w-7xl mx-auto w-full">
          <div className="grid lg:grid-cols-2 gap-20 items-center max-w-6xl mx-auto">
            <div>
              <h2 className="text-4xl sm:text-5xl font-bold mb-12">
                Por que escolher a <span className="text-luminaris-yellow">Luminaris AI?</span>
              </h2>
              <div className="space-y-8">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start gap-4 group">
                    <div className="flex-shrink-0 w-8 h-8 bg-luminaris-yellow rounded-full flex items-center justify-center text-black font-bold group-hover:scale-110 transition-transform">
                      ✓
                    </div>
                    <p className="text-xl text-gray-300 group-hover:text-white transition-colors">{benefit}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-luminaris-yellow/20 to-transparent p-8 rounded-3xl border border-luminaris-yellow/30">
                <div className="bg-black/50 p-8 rounded-2xl backdrop-blur-sm">
                  <h3 className="text-2xl font-bold mb-4 text-luminaris-yellow">Transformação Digital</h3>
                  <p className="text-gray-300 mb-6">
                    Leve seu negócio para o próximo nível com automações inteligentes que trabalham 24/7 para você.
                  </p>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-luminaris-yellow/10 rounded-lg">
                      <div className="text-3xl font-bold text-luminaris-yellow">24/7</div>
                      <div className="text-sm text-gray-400">Disponibilidade</div>
                    </div>
                    <div className="text-center p-4 bg-luminaris-yellow/10 rounded-lg">
                      <div className="text-3xl font-bold text-luminaris-yellow">100%</div>
                      <div className="text-sm text-gray-400">Precisão</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-6 sm:px-8 lg:px-12 bg-gradient-to-r from-luminaris-yellow/10 via-yellow-500/5 to-luminaris-yellow/10">
        <div className="container max-w-4xl mx-auto text-center w-full">
          <h2 className="text-4xl sm:text-5xl font-bold mb-8">
            Pronto para <span className="text-luminaris-yellow">Automatizar?</span>
          </h2>
          <p className="text-xl text-gray-300 mb-12 leading-relaxed">
            Entre em contato agora e descubra como podemos transformar seu negócio com IA
          </p>
          <a 
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-luminaris-yellow text-black px-10 py-5 rounded-full text-xl font-bold hover:bg-yellow-400 transition-all duration-300 hover:scale-110 shadow-2xl animate-glow"
          >
            <span>💬</span>
            <span>Falar no WhatsApp</span>
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-6 sm:px-8 lg:px-12 bg-black border-t border-luminaris-yellow/20">
        <div className="container max-w-7xl mx-auto text-center w-full">
          <div className="flex items-center justify-center gap-3 mb-4">
            <img src="/logo.svg" alt="Luminaris AI" className="w-12 h-12" />
            <div className="text-3xl font-bold">
              <span className="text-luminaris-yellow">Luminaris</span>
              <span className="text-white"> AI</span>
            </div>
          </div>
          <p className="text-gray-400 mb-6">
            Automações Inteligentes com n8n e OpenAI GPT
          </p>
          <div className="flex justify-center gap-8 text-sm text-gray-500">
            <span>© 2025 Luminaris AI</span>
            <span>|</span>
            <span>Todos os direitos reservados</span>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
