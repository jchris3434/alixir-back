import { getThreeTopTestimonials, testimonials } from "./testimonials.ts";

function handler(req: {
  method: string; url: string | URL; 
}) {
  const url = new URL(req.url);

  // route accueil back
  if (url.pathname === "/") {
    return new Response("<p>BackEnd OK - en marche</p>", {
      headers: { "Content-Type": "text/html" },
      status: 200,
    });
  }

  // route API pour letop3 des testimonials
  if (url.pathname === "/api/testimonials/top") {

    // Cors pour le front
    const corsHeaders = {
      "Access-Control-Allow-Origin": "http://localhost:5173", // mon front
      "Access-Control-Allow-Methods": "GET", 
      "Access-Control-Allow-Headers": "Content-Type",
    };

    if (req.method === "OPTIONS") {
      return new Response(null, {
        headers: corsHeaders,
        status: 204,
      });
    }

    try {
      const topTestimonials = getThreeTopTestimonials(testimonials);
      return new Response(JSON.stringify(topTestimonials), {
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
        status: 200,
      });
    } catch (error) {
      console.error("erreur de recup des testimonials :", error);
      return new Response("erreur interne serveur", { status: 500 });
    }
  }

  return new Response("Page non trouvée", { status: 404 });
}

console.log(`🚀 Serveur Deno en cours d'exécution : http://localhost:8000`);
Deno.serve(handler);
