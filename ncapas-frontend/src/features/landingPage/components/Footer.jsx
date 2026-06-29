export default function Footer() {
  return (
    <footer className="border-t border-neon-blue/20 py-12 px-6 bg-muted/30">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div className="space-y-4">
            <h3 className="font-bold text-lg">EventHub</h3>
            <p className="text-sm text-foreground/60">
              La plataforma de eventos más moderna y emocionante del mercado.
            </p>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold">Explorar</h4>
            <ul className="space-y-2 text-sm text-foreground/60">
              <li>
                <a
                  href="#"
                  className="hover:text-neon-blue transition-colors"
                >
                  Eventos Próximos
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-neon-blue transition-colors"
                >
                  Categorías
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-neon-blue transition-colors"
                >
                  Favoritos
                </a>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold">Compañía</h4>
            <ul className="space-y-2 text-sm text-foreground/60">
              <li>
                <a
                  href="#"
                  className="hover:text-neon-blue transition-colors"
                >
                  Acerca de
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-neon-blue transition-colors"
                >
                  Blog
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-neon-blue transition-colors"
                >
                  Contacto
                </a>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold">Legal</h4>
            <ul className="space-y-2 text-sm text-foreground/60">
              <li>
                <a
                  href="#"
                  className="hover:text-neon-blue transition-colors"
                >
                  Privacidad
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-neon-blue transition-colors"
                >
                  Términos
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-neon-blue transition-colors"
                >
                  Cookies
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-neon-blue/20 pt-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-sm text-foreground/60">
          <p>&copy; 2026 EventHub. Todos los derechos reservados.</p>

          <div className="flex gap-4">
            <a
              href="#"
              className="hover:text-neon-blue transition-colors"
            >
              Twitter
            </a>

            <a
              href="#"
              className="hover:text-neon-blue transition-colors"
            >
              Instagram
            </a>

            <a
              href="#"
              className="hover:text-neon-blue transition-colors"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}