import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { type ReactNode, useState } from "react"

type FormDialogProps = {
  trigger: ReactNode
  title: string
  description?: string
  children: ReactNode
  onSubmit: () => void | Promise<void>
  submitText?: string
  cancelText?: string
}

export function FormDialog({
  trigger,
  title,
  description,
  children,
  onSubmit,
  submitText = "Continua",
  cancelText = "Anuleaza",
}: FormDialogProps) {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async () => {
    try {
      setLoading(true)
      await onSubmit()
      setOpen(false) // ✅ inchide modalul
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description && (
            <DialogDescription>{description}</DialogDescription>
          )}
        </DialogHeader>

        <form
          onSubmit={(e) => {
            e.preventDefault()
            handleSubmit()
          }}
          className="space-y-4"
        >
          {children}

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={loading}
            >
              {cancelText}
            </Button>

            <Button type="submit" disabled={loading}>
              {loading ? "Se salveaza..." : submitText}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
