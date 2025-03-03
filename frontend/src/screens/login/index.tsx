import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";

import { login } from "../../api/login";
import nlcLogo from "../../assets/images/nlc-logo.png";
import { Button } from "../../components/button";
import { Input } from "../../components/input";
import { useAuthStore } from "../../stores/auth.store";
import { LocalStorageManager } from "../../utils/local-storage-manager";

import { AppName, Container, Copyright, Form, Title } from "./styles";

type FormData = {
  email: string;
  password: string;
};

export const LoginScreen = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const setToken = useAuthStore((state) => state.setToken);

  const mutation = useMutation({
    mutationFn: login,
    onSuccess: ({ accessToken }) => {
      LocalStorageManager.set("token", accessToken);
      setToken(accessToken);
      toast.success("Logged in successfully");
    },
    onError: (error: AxiosError) => {
      if (error?.response?.status === 401) {
        toast.error("Invalid email or password");
      } else {
        toast.error("An error occurred. Please try again later");
      }
    },
  });

  const onSubmit = (data: FormData) => {
    mutation.mutate(data);
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <img src={nlcLogo} alt="Purple Arrow - NoLimit Creatives Logo" />
        <AppName>Service Order Management</AppName>
        <Title>Platform Login</Title>
        <Controller
          control={control}
          name="email"
          rules={{ required: "* Email is required" }}
          render={({ field }) => (
            <Input
              label="Email"
              placeholder="Enter your email..."
              autoCapitalize="none"
              autoCorrect="off"
              error={errors.email?.message}
              {...field}
            />
          )}
        />
        <Controller
          control={control}
          name="password"
          rules={{ required: "* Password is required" }}
          render={({ field }) => (
            <Input
              label="Password"
              type="password"
              placeholder="Enter your password..."
              autoCapitalize="none"
              autoCorrect="off"
              error={errors.password?.message}
              {...field}
            />
          )}
        />
        <Button type="submit">Sign in</Button>
      </Form>
      <Copyright>
        Copyright © 2025 NoLimit Creatives™. <br /> All Rights Reserved.
      </Copyright>
    </Container>
  );
};
