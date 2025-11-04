import { Card, CardContent } from "@/components/ui/card";

export default function Home() {
  return (
    <div className="p-6 grid gap-4">
      <Card>
        <CardContent className="p-6 text-center">
          <h1 className="text-3xl font-bold">📊 Panel de Control</h1>
          <p className="text-muted-foreground mt-2">
            Bienvenido al sistema de gestión de usuarios, planes y
            suscripciones.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
