import { NavLink } from "./NavLink";
import { Menu } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/matches", label: "Matches" },
    { to: "/teams", label: "Teams" },
    { to: "/players", label: "Players" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <NavLink
            to="/"
            className="text-2xl font-bold text-gradient flex items-center gap-2"
          >
            <img
              src="/we-league-logo.webp"
              alt="We League Logo"
              className="w-12 h-12"
            />
            WE League
          </NavLink>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className="text-sm font-medium text-foreground/70 transition-colors hover:text-foreground"
                activeClassName="text-primary"
              >
                {link.label}
              </NavLink>
            ))}
          </div>

          {/* Mobile Navigation */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px]">
              <div className="flex flex-col gap-6 mt-8">
                {navLinks.map((link) => (
                  <NavLink
                    key={link.to}
                    to={link.to}
                    className="text-lg font-medium text-foreground/70 transition-colors hover:text-foreground"
                    activeClassName="text-primary"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.label}
                  </NavLink>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
