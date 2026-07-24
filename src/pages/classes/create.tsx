// import { CreateView } from "@/components/refine-ui/views/create-view.tsx";
// import { Breadcrumb } from "@/components/refine-ui/layout/breadcrumb.tsx";
// import { Button } from "@/components/ui/button";
// import { useBack } from "@refinedev/core";
// import { Separator } from "@/components/ui/separator";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Form, useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { classSchema } from "@/lib/schema";
// import * as z from "zod";

// const ClassesCreate = () => {
//   const back = useBack();

//   const form = useForm({
//     resolver: zodResolver(classSchema),
//     refineCoreProps: {
//       resource: "classes",
//       action: "create"
//     },
//     defaultValues: {
//       status: 'active'
//     },
//   });

//    const onSubmit = (values: z.infer<typeof classSchema>) => {
//     try {
//       console.log(values);
//     } catch (e) {
//       console.log('Error creating new classes', e)
//     }
//   }

//   return (
//     <CreateView className="class-view">
//       <Breadcrumb />

//       <h1 className="page-title">Create a Class</h1>

//       <div className="intro-row">
//         <p>Provide the required information below to add a class.</p>
//         <Button onClick={back}>Go Back</Button>
//       </div>

//       <Separator />

//       <div className="my-4 flex items-center">
//         <Card className="class-form-card">
//           <CardHeader className="relative z-10">
//             <CardTitle className="text-2xl pb-0, font-bold">
//               Fill out the form
//             </CardTitle>
//           </CardHeader>

//           <Separator />

//           <CardContent className="mt-7">
//             <Form {...form}>
//               {/* <form onSubmit={form.handleSubmit(onSubmit)}></form> */}
//             </Form>
//           </CardContent>
//         </Card>
//       </div>
//     </CreateView>
//   );
// };

// export default ClassesCreate;
