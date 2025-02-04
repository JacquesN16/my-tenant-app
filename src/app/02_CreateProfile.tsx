import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {z} from "zod";
import { Button } from "../components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "../components/ui/form"
import { Input } from "../components/ui/input"

const formSchema = z.object({
        firstName: z.string().optional(),
        lastName: z.string().optional(),
        startDate: z.date({required_error:"REQUIRED"}),
        rent: z.number()
            .positive()
            .or(z.string())
            .pipe(
                z.coerce
                    .number()
                    .positive()
            ),
        charge: z.number()
            .positive()
            .or(z.string())
            .pipe(
                z.coerce
                    .number()
                    .positive()
            ),

})

export default function CreateProfile () {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            firstName: "",
            lastName:"",
            rent:0,
            charge:0,
        }
    })


    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log('click', {values})
    }

    return (<>
        <h1 className='text-center font-bold scale-95'>Create a new profile</h1>
        <div className='w-2/3 mx-auto'>
            <Form {...form}  >
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-8">

                    <FormField
                        control={form.control}
                        name="firstName"
                        render={({ field }) => (
                            <>
                                <FormItem>
                                    <FormLabel>First name</FormLabel>
                                    <FormControl>
                                        <Input placeholder={field.value} type="text" {...field}/>
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            </>

                        )}
                    />
                    <FormField
                        control={form.control}
                        name="lastName"
                        render={({ field }) => (
                            <>
                                <FormItem>
                                    <FormLabel>Last name</FormLabel>
                                    <FormControl>
                                        <Input placeholder={field.value} type="text" {...field}/>
                                    </FormControl>
                                </FormItem>
                            </>

                        )}
                    />

                    <FormField
                        control={form.control}
                        name="rent"
                        render={({ field }) => (
                            <>
                                <FormItem>
                                    <FormLabel>Rent</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="string"
                                            placeholder={field.value + '€yarn'}
                                            {...field} />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            </>

                        )}
                    />
                    <FormField
                        control={form.control}
                        name="charge"
                        render={({ field }) => (
                            <>
                                <FormItem>
                                    <FormLabel>Monthly Charge</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="string"
                                            placeholder={field.value + '€'}
                                            {...field} />
                                    </FormControl>
                                    <FormMessage/>
                                </FormItem>
                            </>
                        )}
                    />
                    <Button type="submit">
                        Submit
                    </Button>
                </form>
            </Form>
        </div>
    </>
)}

