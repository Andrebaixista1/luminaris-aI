import { useState } from 'react'
import { Link } from 'react-router-dom'

function LandingPage() {
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
    <div className="min-h-screen bg-gradient-to-br from-white via-luminaris-gray to-gray-50 text-gray-900 overflow-x-hidden">
      {/* Header/Navbar */}
      <nav className="fixed w-full top-0 z-50 bg-white/80 backdrop-blur-md border-b border-luminaris-gold/20 shadow-sm">
        <div className="container max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-5">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <img src="/logo.svg" alt="Luminaris AI" className="w-10 h-10" />
              <div className="text-2xl font-bold">
                <span className="text-luminaris-gold">Luminaris</span>
                <span className="text-gray-900"> AI</span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Link 
                to="/login"
                className="hidden sm:block text-luminaris-gold hover:text-amber-600 transition-colors font-semibold"
              >
                Login
              </Link>
              <a 
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-luminaris-gold text-white px-6 py-2 rounded-full font-semibold hover:bg-amber-600 transition-all duration-300 hover:scale-105 shadow-lg"
              >
                Fale Conosco
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-40 pb-32 px-6 sm:px-8 lg:px-12 min-h-screen flex items-center">
        <div className="container max-w-7xl mx-auto w-full">
          <div className="text-center animate-fadeIn">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-10 px-4 text-gray-900" style={{lineHeight: '1.4'}}>
              Automatize seu Negócio
              <br />
              <span className="text-gray-900 inline-block mt-4 px-6 py-3 bg-amber-50 rounded-2xl">com Inteligência Artificial</span>
            </h1>
            <p className="text-xl sm:text-2xl text-gray-700 mb-14 max-w-3xl mx-auto leading-relaxed px-4">
              Transforme processos manuais em automações inteligentes com n8n e OpenAI GPT
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center animate-slideUp px-4">
              <a 
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-luminaris-gold text-white px-8 py-4 rounded-full text-lg font-bold hover:bg-amber-600 transition-all duration-300 hover:scale-110 shadow-xl"
              >
                🚀 Comece Agora
              </a>
              <a 
                href="#features"
                className="border-2 border-luminaris-gold text-luminaris-gold px-8 py-4 rounded-full text-lg font-bold hover:bg-luminaris-gold hover:text-white transition-all duration-300"
              >
                Saiba Mais
              </a>
            </div>
          </div>

          {/* Floating Elements */}
          <div className="mt-24 relative h-64">
            <div className="absolute top-0 left-1/4 w-32 h-32 bg-amber-200/30 rounded-full blur-3xl animate-float"></div>
            <div className="absolute top-10 right-1/4 w-40 h-40 bg-amber-100/40 rounded-full blur-3xl animate-float" style={{animationDelay: '1s'}}></div>
            <div className="absolute bottom-0 left-1/2 w-36 h-36 bg-amber-300/20 rounded-full blur-3xl animate-float" style={{animationDelay: '2s'}}></div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-32 px-6 sm:px-8 lg:px-12 bg-gray-50">
        <div className="container max-w-7xl mx-auto w-full">
          <h2 className="text-4xl sm:text-5xl font-bold text-center mb-20 text-gray-900">
            Nossas <span className="text-luminaris-gold">Soluções</span>
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 max-w-7xl mx-auto">
            {features.map((feature, index) => (
              <div 
                key={index}
                onMouseEnter={() => setActiveFeature(index)}
                className={`p-10 rounded-2xl border-2 transition-all duration-300 cursor-pointer ${
                  activeFeature === index 
                    ? 'border-luminaris-gold bg-amber-50 scale-105 shadow-lg' 
                    : 'border-gray-200 bg-white hover:border-luminaris-gold/50 hover:shadow-md'
                }`}
              >
                <div className="text-6xl mb-6">{feature.icon}</div>
                <h3 className="text-2xl font-bold mb-6 text-gray-900">{feature.title}</h3>
                <p className="text-gray-700 text-lg leading-relaxed">{feature.description}</p>
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
              <h2 className="text-4xl sm:text-5xl font-bold mb-12 text-gray-900">
                Por que escolher a <span className="text-luminaris-gold">Luminaris AI?</span>
              </h2>
              <div className="space-y-8">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start gap-4 group">
                    <div className="flex-shrink-0 w-8 h-8 bg-luminaris-gold text-white rounded-full flex items-center justify-center font-bold group-hover:scale-110 transition-transform">
                      ✓
                    </div>
                    <p className="text-xl text-gray-700 group-hover:text-gray-900 transition-colors">{benefit}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-amber-50 to-transparent p-8 rounded-3xl border border-luminaris-gold/30 shadow-lg">
                <div className="bg-white p-8 rounded-2xl backdrop-blur-sm">
                  <h3 className="text-2xl font-bold mb-4 text-gray-900">Transformação Digital</h3>
                  <p className="text-gray-700 mb-6">
                    Leve seu negócio para o próximo nível com automações inteligentes que trabalham 24/7 para você.
                  </p>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-amber-50 rounded-lg">
                      <div className="text-3xl font-bold text-gray-900">24/7</div>
                      <div className="text-sm text-gray-600">Disponibilidade</div>
                    </div>
                    <div className="text-center p-4 bg-amber-50 rounded-lg">
                      <div className="text-3xl font-bold text-gray-900">100%</div>
                      <div className="text-sm text-gray-600">Precisão</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-6 sm:px-8 lg:px-12 bg-gradient-to-r from-amber-50 via-yellow-50 to-amber-50">
        <div className="container max-w-4xl mx-auto text-center w-full">
          <h2 className="text-4xl sm:text-5xl font-bold mb-8 text-gray-900">
            Pronto para <span className="text-luminaris-gold">Automatizar?</span>
          </h2>
          <p className="text-xl text-gray-700 mb-12 leading-relaxed">
            Entre em contato agora e descubra como podemos transformar seu negócio com IA
          </p>
          <a 
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-luminaris-gold text-white px-10 py-5 rounded-full text-xl font-bold hover:bg-amber-600 transition-all duration-300 hover:scale-110 shadow-xl"
          >
            <span>💬</span>
            <span>Falar no WhatsApp</span>
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-6 sm:px-8 lg:px-12 bg-gray-900 border-t border-gray-800">
        <div className="container max-w-7xl mx-auto text-center w-full">
          <div className="flex items-center justify-center gap-3 mb-4">
            <img src="/logo.svg" alt="Luminaris AI" className="w-12 h-12" />
            <div className="text-3xl font-bold">
              <span className="text-luminaris-gold">Luminaris</span>
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

export default LandingPage
