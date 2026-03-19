import type { ComponentPropsWithoutRef } from "react";

export function Form(props: ComponentPropsWithoutRef<"form">) {
  return <form className="form-container" {...props} />;
}
