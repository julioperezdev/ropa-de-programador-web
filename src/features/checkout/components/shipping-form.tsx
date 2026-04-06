"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, Lock } from "lucide-react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { shippingFormSchema, type ShippingSchema } from "@/lib/validators/shipping";
import { useCartStore } from "@/store/use-cart-store";

const fields: Array<{
  name: keyof ShippingSchema;
  label: string;
  placeholder: string;
  optional?: boolean;
}> = [
  { name: "firstName", label: "Nombre", placeholder: "Julio" },
  { name: "lastName", label: "Apellido", placeholder: "Pérez" },
  { name: "phone", label: "Teléfono", placeholder: "+54 11 5555 5555" },
  { name: "email", label: "Email", placeholder: "hola@tuempresa.com" },
  { name: "street", label: "Calle", placeholder: "Av. Corrientes" },
  { name: "streetNumber", label: "Número", placeholder: "1234" },
  { name: "floorApartment", label: "Piso / Depto", placeholder: "8B", optional: true },
  { name: "reference", label: "Referencia", placeholder: "Portería gris", optional: true },
  { name: "postalCode", label: "Código postal", placeholder: "1043" },
  { name: "city", label: "Ciudad", placeholder: "Buenos Aires" },
];

export function ShippingForm() {
  const cartItems = useCartStore((state) => state.cartItems);
  const [submitted, setSubmitted] = useState(false);

  const form = useForm<ShippingSchema>({
    resolver: zodResolver(shippingFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
      street: "",
      streetNumber: "",
      floorApartment: "",
      reference: "",
      postalCode: "",
      city: "",
    },
  });

  const handleSubmit = form.handleSubmit(() => {
    setSubmitted(true);
  });

  return (
    <Card className="h-full">
      <CardHeader className="border-b border-border/70 bg-white/70 pb-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-muted-foreground">Formulario visual</p>
            <CardTitle className="mt-2">Datos de envío</CardTitle>
          </div>
          <div className="inline-flex items-center gap-2 rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-secondary-foreground">
            <Lock className="h-3.5 w-3.5" />
            Solo frontend
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-6">
        <form className="space-y-5" onSubmit={handleSubmit}>
          <div className="grid gap-5 sm:grid-cols-2">
            {fields.map((field) => (
              <div
                key={field.name}
                className={field.name === "street" || field.name === "reference" ? "sm:col-span-2" : ""}
              >
                <Label htmlFor={field.name}>
                  {field.label}
                  {field.optional ? " (opcional)" : ""}
                </Label>
                <Input
                  className="mt-2"
                  id={field.name}
                  placeholder={field.placeholder}
                  {...form.register(field.name)}
                />
                {form.formState.errors[field.name] ? (
                  <p className="mt-2 text-sm text-danger">
                    {form.formState.errors[field.name]?.message as string}
                  </p>
                ) : null}
              </div>
            ))}
          </div>

          <Button className="w-full" disabled={cartItems.length === 0} size="lg" type="submit">
            Continuar al pago
          </Button>

          <p className="text-sm leading-6 text-muted-foreground">
            Esta acción valida los datos y deja la UI lista para conectar el checkout real más adelante.
          </p>

          {submitted ? (
            <div className="rounded-2xl border border-success/30 bg-success/10 p-4 text-sm text-success">
              <p className="inline-flex items-center gap-2 font-semibold">
                <CheckCircle2 className="h-4 w-4" />
                Datos validados correctamente.
              </p>
              <p className="mt-2 text-sm leading-6 text-foreground/80">
                El backend, la orden y la pasarela de pago quedan pendientes para la siguiente fase.
              </p>
            </div>
          ) : null}

          {cartItems.length === 0 ? (
            <p className="text-sm text-muted-foreground">Agregá al menos un producto para habilitar la continuación.</p>
          ) : null}
        </form>
      </CardContent>
    </Card>
  );
}
