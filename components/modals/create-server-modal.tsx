"use client"

import axios from "axios"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useRouter } from "next/navigation"

import "@uploadthing/react/styles.css"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { formSchema } from "@/lib/zodSchema"
import FileUpload from "@/components/FileUpload"
import { useModal } from "@/hooks/use-modal-store"

type FormSchema = z.infer<typeof formSchema>

const CreateServerModal = () => {
  const { isOpen, onClose, type } = useModal()
  const isModalOpen = isOpen && type == "createServer"
  const router = useRouter()
  const forms = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      imageUrl: "",
    },
  })
  const { isSubmitting: isLoading } = forms.formState
  const onSubmit = async (values: FormSchema) => {
    try {
      const response = await axios.post("/api/servers", values)
      console.log(values)

      forms.reset()
      router.refresh()
      onClose()
    } catch (err) {
      console.log(err, ": submit RHF error")
    }
  }
  const handleClose = () => {
    onClose()
  }
  return (
    <>
      <Dialog open={isModalOpen} onOpenChange={handleClose}>
        <DialogContent className="bg-white text-black p-0 overflow-hidden">
          <DialogHeader className="pt-8 px-6">
            <DialogTitle className="text-2xl text-center font-bold">
              Customise yor server
            </DialogTitle>
            <DialogDescription className="text-center text-zinc-500">
              Give your server a personality with a name and an image. You can
              always change it later.
            </DialogDescription>
          </DialogHeader>
          <Form {...forms}>
            <form onSubmit={forms.handleSubmit(onSubmit)} className="space-y-8">
              <div className="space-y-8 px-6">
                <div className="flex items-center justify-center text-center">
                  <FormField
                    control={forms.control}
                    name="imageUrl"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <FileUpload
                            endpoint="serverImage"
                            onChange={field.onChange}
                            value={field.value}
                          />
                         
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={forms.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="">
                      <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70">
                        Server Name
                      </FormLabel>
                      <FormControl>
                        <Input
                          disabled={isLoading}
                          className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0 px-4 py-2 rounded-lg"
                          placeholder="Enter server name"
                          {...field}
                        />
                      </FormControl>
                      <div className="h-6">
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />
              </div>
              <DialogFooter className="bg-gray-100 px-6 py-4">
                <Button
                  variant="primary"
                  disabled={isLoading}
                  className="mx-auto px-12"
                  type="submit"
                >
                  Create
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default CreateServerModal
