"use client";
import { SubmitHandler, useForm } from "react-hook-form";
import { PiEyeClosedBold } from "react-icons/pi";
import { FaRegEye } from "react-icons/fa";
import {
  Box,
  Button,
  Field,
  Icon,
  Input,
  InputGroup,
  Text,
  Fieldset,
  VStack,
} from "@chakra-ui/react";
import React, { useState } from "react";
import * as z from "zod/v4";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { zodiak, plus } from "@/public/fontExport";
import axios from "axios";
import { useRouter } from "next/navigation";

const schmea = z.object({
  email: z.email(),
  password: z.string().min(8, { error: "Password must be more that 8" }),
});

type IUser = z.infer<typeof schmea>;

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<IUser>({ resolver: zodResolver(schmea) });

  const [eyestate, setEyeState] = useState(true);
  const router = useRouter();

  const handleViewPassword = () => {
    setEyeState(!eyestate);
  };

  const handleSubmitData: SubmitHandler<IUser> = async (data, e: any) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8080/auth/signIn",
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      console.log(response.status);
      if (response.status === 201) {
        router.push("home");
      }
    } catch (error: any) {
      console.log(error.message);
      if (error.response) {
        console.error("Error during sign-in:", error.response.data);
        console.error("Status:", error.response.status);
        console.error("Headers:", error.response.headers);
      } else {
        console.error("Error setting up request:", error.message);
      }
    }
  };
  return (
    <>
      <div className="w-full h-screen grid grid-cols-1 sm:grid-cols-2 justify-center items-center bg-transparent text-[#633e24]">
        <div className="bg-amber-50 w-full h-full"></div>
        <div className="w-full h-full grid justify-center items-center font-zodiak">
          <Box
            as={"form"}
            onSubmit={handleSubmit(handleSubmitData)}
            userSelect={"none"}
            className="w-[290px] text-center sm:w-[300px] md:text-start md:w-[370px] xl:w-[400px] h-fit"
            paddingInline={"10px"}
            paddingBlock={"10px"}
            color={"#633e24"}
          >
            <Text
              fontSize={"5xl"}
              fontFamily={`${zodiak.className}`}
              fontWeight={"bolder"}
            >
              Welcome Back! <br /> Glad to See you, Again !
            </Text>
            <VStack marginY={"3"} fontStyle={`${plus.className}`}>
              <Fieldset.Root>
                {" "}
                <Fieldset.Content>
                  <Field.Root required gapY={"3"}>
                    <Field.Label fontSize={{ base: "xl", sm: "lg" }}>
                      Email <Field.RequiredIndicator />
                    </Field.Label>
                    <Input
                      type="text"
                      placeholder="Enter your email"
                      fontSize={{ base: "lg", sm: "md" }}
                      size={{ base: "lg", sm: "md" }}
                      css={{ "--focus-color": "black" }}
                      _placeholder={{ color: "blackAlpha.600" }}
                      color={"#633e24"}
                      suppressHydrationWarning={true}
                      {...register("email")}
                    />
                    {errors.email && (
                      <Field.ErrorText fontSize={"sm"} color={"red.900"}>
                        {errors.email.message}
                      </Field.ErrorText>
                    )}
                  </Field.Root>
                  <Field.Root>
                    <Field.Label fontSize={{ base: "xl", sm: "lg" }}>
                      Password <Field.RequiredIndicator />
                    </Field.Label>
                    <InputGroup
                      w={"full"}
                      maxW={"sm"}
                      endElement={
                        <Icon
                          bg="transparent"
                          size={{ base: "2xl", sm: "lg" }}
                          w={"30px"}
                          h={"11"}
                          color={"black"}
                          onClick={() => {
                            handleViewPassword();
                          }}
                        >
                          {eyestate ? <PiEyeClosedBold /> : <FaRegEye />}
                        </Icon>
                      }
                    >
                      <Input
                        suppressHydrationWarning={true}
                        {...register("password")}
                        type={eyestate ? "password" : "text"}
                        fontSize={{ base: "lg", sm: "md" }}
                        placeholder="Enter your password"
                        css={{ "--focus-color": "black" }}
                        _placeholder={{ color: "blackAlpha.600" }}
                        color={"#633e24"}
                        size={{ base: "lg", sm: "md" }}
                      />
                    </InputGroup>
                    {errors.password && (
                      <Text fontSize={"sm"} color={"red.900"}>
                        {errors.password.message}
                      </Text>
                    )}
                    <Button
                      suppressHydrationWarning={true}
                      type="submit"
                      backgroundColor={"#633e27"}
                      marginTop={"2"}
                      fontSize={{ base: "lg", sm: "md" }}
                      disabled={isSubmitting ? true : false}
                      borderRadius={"lg"}
                      w={"full"}
                      color={"white"}
                    >
                      {isSubmitting ? "Looding" : "Submit"}
                    </Button>
                  </Field.Root>
                </Fieldset.Content>
              </Fieldset.Root>
            </VStack>
            <Box
              textAlign={"center"}
              fontFamily={`${zodiak.className}`}
              fontSize={{ base: "xl", sm: "lg" }}
            >
              Don't have an account ?{" "}
              <Link href={"/signUp"} className="text-black/90 font-bold">
                <Text color={"black"} fontWeight={"bolder"}>
                  Sign Up for Free
                </Text>
              </Link>
            </Box>
          </Box>
        </div>
      </div>
    </>
  );
};

export default Login;
