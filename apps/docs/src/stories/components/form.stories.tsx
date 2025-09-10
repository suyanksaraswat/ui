/* eslint-disable react-hooks/rules-of-hooks */

import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "@suyanksaraswat/ui/button";
import { Form, useForm } from "@suyanksaraswat/ui/form";
import { TextField } from "@suyanksaraswat/ui/textfield";
import { Toaster, toast } from "@suyanksaraswat/ui/toast";
import { z } from "zod";

type FormProps = React.ComponentPropsWithoutRef<typeof Form>;

const FormSchema = z.object({
  username: z.string().min(2, "Username must be at least 2 characters."),
});

const meta: Meta<FormProps> = {
  title: "Components/Form",
  decorators: [
    (Story) => (
      <>
        <Story />
        <Toaster />
      </>
    ),
  ],
  component: Form,
  render(props) {
    const form = useForm({
      schema: FormSchema,
      defaultValues: {
        username: "",
      },
    });

    const handleSubmit = form.handleSubmit((data) => {
      toast("You submitted the following values:", {
        description: (
          <pre className="mt-2 w-full rounded-md bg-slate-950 p-4">
            <code className="text-white">{JSON.stringify(data, null, 2)}</code>
          </pre>
        ),
      });
    });

    return (
      <Form {...props} {...form}>
        <form onSubmit={handleSubmit} className="w-2/3 space-y-6">
          <Form.Field
            control={form.control}
            name="username"
            render={({ field }) => (
              <Form.Item>
                <Form.Label>Username</Form.Label>
                <Form.Control>
                  <TextField placeholder="suyank" {...field} />
                </Form.Control>
                <Form.Message />
              </Form.Item>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    );
  },
};

export default meta;

type Story = StoryObj<FormProps>;

export const Default: Story = {};
