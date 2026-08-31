import { Toaster as Sonner } from "sonner";

const Toaster = ({ ...props }: React.ComponentProps<typeof Sonner>) => {
  return (
    <Sonner
      theme="dark"
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast bg-card text-foreground shadow-[var(--shadow-border)]",
          description: "text-muted-foreground",
          actionButton: "bg-primary text-primary-foreground",
          cancelButton: "bg-secondary text-foreground",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
