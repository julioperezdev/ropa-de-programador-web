import { z } from "zod";

export const shippingFormSchema = z.object({
  firstName: z.string().min(2, "Ingresá un nombre válido."),
  lastName: z.string().min(2, "Ingresá un apellido válido."),
  phone: z.string().min(8, "Ingresá un teléfono válido."),
  email: z.email("Ingresá un email válido."),
  street: z.string().min(3, "Ingresá una calle válida."),
  streetNumber: z.string().min(1, "Ingresá el número."),
  floorApartment: z.string().optional(),
  reference: z.string().optional(),
  postalCode: z.string().min(4, "Ingresá un código postal válido."),
  city: z.string().min(2, "Ingresá una ciudad válida."),
});

export type ShippingSchema = z.infer<typeof shippingFormSchema>;
