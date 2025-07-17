  import Link from "next/link";
import { Calendar, Shield, Users, CheckCircle, Clock, Star, UserCheck, Zap } from "lucide-react";
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from "@/components/ui/accordion";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center">
      <div className="flex-1 w-full flex flex-col items-center">
        {/* Hero Section */}
        <section className="w-full max-w-5xl px-5 py-20 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Agendá tu sesión online en minutos
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Encontrá al psicólogo ideal, filtrá por temática y reservá un horario que se ajuste a tu agenda.
          </p>
          <button className="bg-primary text-primary-foreground px-8 py-4 rounded-lg text-lg font-semibold hover:bg-primary/90 transition-colors">
            <Link href="/find">Comenzar ahora</Link>
          </button>
        </section>

        {/* Three Steps Section */}
        <section className="w-full max-w-5xl px-5 py-16">
          <h2 className="text-3xl font-bold text-center mb-12">Cómo funciona</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <UserCheck className="w-8 h-8 text-primary" />
                <span className="absolute bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold -mt-6 -mr-6">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Creá tu cuenta</h3>
              <p className="text-muted-foreground">
                Registrate con tu email o Google.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-primary" />
                <span className="absolute bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold -mt-6 -mr-6">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Elegí tu psicólogo</h3>
              <p className="text-muted-foreground">
                Filtrá por temática (ansiedad, pareja, duelo…).
              </p>
            </div>
            <div className="text-center">
              <div className="bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-8 h-8 text-primary" />
                <span className="absolute bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold -mt-6 -mr-6">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Reservá tu horario</h3>
              <p className="text-muted-foreground">
                Calendario adaptado a tu zona horaria. Confirmación instantánea.
              </p>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="w-full max-w-5xl px-5 py-16">
          <h2 className="text-3xl font-bold text-center mb-12">Por qué elegir Psi Mammoliti</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-card border rounded-lg p-6 text-center">
              <Shield className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">100% online y seguro</h3>
              <p className="text-sm text-muted-foreground">
                Plataforma segura con encriptación end-to-end
              </p>
            </div>
            <div className="bg-card border rounded-lg p-6 text-center">
              <CheckCircle className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Profesionales verificados</h3>
              <p className="text-sm text-muted-foreground">
                Psicólogos matriculados y con experiencia comprobada
              </p>
            </div>
            <div className="bg-card border rounded-lg p-6 text-center">
              <Clock className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Horarios flexibles</h3>
              <p className="text-sm text-muted-foreground">
                Disponibilidad 24/7 para adaptarse a tu agenda
              </p>
            </div>
            <div className="bg-card border rounded-lg p-6 text-center">
              <Zap className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Reserva instantánea</h3>
              <p className="text-sm text-muted-foreground">
                Confirmación inmediata y recordatorios automáticos
              </p>
            </div>
          </div>
        </section>

        {/* Testimonial Section */}
        <section className="w-full max-w-5xl px-5 py-16">
          <div className="bg-card border rounded-lg p-8 text-center max-w-2xl mx-auto">
            <Star className="w-8 h-8 text-yellow-500 mx-auto mb-4" />
            <blockquote className="text-lg italic mb-6">
              &ldquo;Encontré el psicólogo perfecto para mi situación. La plataforma es súper fácil de usar y la atención es excelente. Recomiendo 100%.&rdquo;
            </blockquote>
            <div className="flex items-center justify-center gap-3">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <span className="text-primary font-semibold">M</span>
              </div>
              <div>
                <p className="font-semibold">María González</p>
                <p className="text-sm text-muted-foreground">Paciente</p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="w-full max-w-5xl px-5 py-16">
          <h2 className="text-3xl font-bold text-center mb-12">Preguntas frecuentes</h2>
          <Accordion type="single" collapsible className="max-w-2xl mx-auto">
            <AccordionItem value="item-1">
              <AccordionTrigger>¿Cómo sé si el psicólogo es el adecuado para mí?</AccordionTrigger>
              <AccordionContent>
                Todos nuestros profesionales tienen perfiles detallados con su especialidad, experiencia y metodología. Podés filtrar por temática específica y leer reseñas de otros pacientes. Si no te sentís cómodo, podés cambiar de profesional en cualquier momento.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>¿Qué pasa si necesito cancelar una sesión?</AccordionTrigger>
              <AccordionContent>
                Podés cancelar o reprogramar tus sesiones hasta 24 horas antes del horario programado sin costo adicional. Para cancelaciones con menos de 24 horas de anticipación, se aplicará una tarifa de cancelación.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>¿Es segura la plataforma para mis datos personales?</AccordionTrigger>
              <AccordionContent>
                Sí, utilizamos encriptación de extremo a extremo y cumplimos con todas las normativas de protección de datos. Tus conversaciones y datos personales están completamente seguros y solo son accesibles para vos y tu psicólogo.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </section>


      </div>
    </main>
  );
}
