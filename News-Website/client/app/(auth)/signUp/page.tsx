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
  HStack,
} from "@chakra-ui/react";
import React, { useState } from "react";
import * as z from "zod/v4";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { zodiak, plus } from "@/public/fontExport";
import { FaArrowRight } from "react-icons/fa6";

const schmea = z.object({
  firstname: z.string(),
  lastname: z.string(),
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

  const handleViewPassword = () => {
    setEyeState(!eyestate);
  };

  const handleSubmitData: SubmitHandler<IUser> = (data) => {
    console.log(data);
  };
  return (
    <>
      <div className="w-full h-screen grid grid-cols-1 sm:grid-cols-2 justify-center items-center bg-transparent text-[#633e24]">
        <div className="w-full h-full grid justify-center items-center">
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
              fontSize={"4xl"}
              fontWeight={"bolder"}
              fontFamily={`${zodiak.className}`}
            >
              Create an account
            </Text>
            <VStack marginY={"3"} fontStyle={`${plus.className}`}>
              <Fieldset.Root>
                {" "}
                <Fieldset.Content>
                  <HStack>
                    <Field.Root required gapY={"3"}>
                      <Field.Label fontSize={{ base: "xl", sm: "lg" }}>
                        First Name <Field.RequiredIndicator />
                      </Field.Label>
                      <Input
                        type="text"
                        placeholder="eg. John"
                        suppressHydrationWarning={true}
                        fontSize={{ base: "lg", sm: "md" }}
                        css={{ "--focus-color": "black" }}
                        _placeholder={{ color: "blackAlpha.600" }}
                        color={"#633e24"}
                        {...register("firstname")}
                        size={{ base: "lg", sm: "md" }}
                      />
                      {errors.email && (
                        <Field.ErrorText fontSize={"sm"} color={"red.900"}>
                          {errors.email.message}
                        </Field.ErrorText>
                      )}
                    </Field.Root>
                    <Field.Root required gapY={"3"}>
                      <Field.Label fontSize={{ base: "xl", sm: "lg" }}>
                        Last Name{" "}
                      </Field.Label>
                      <Input
                        type="text"
                        placeholder="eg. Wike"
                        suppressHydrationWarning={true}
                        fontSize={{ base: "lg", sm: "md" }}
                        css={{ "--focus-color": "black" }}
                        _placeholder={{ color: "blackAlpha.600" }}
                        color={"#633e24"}
                        {...register("lastname")}
                        size={{ base: "lg", sm: "md" }}
                      />
                      {errors.email && (
                        <Field.ErrorText fontSize={"sm"} color={"red.900"}>
                          {errors.email.message}
                        </Field.ErrorText>
                      )}
                    </Field.Root>
                  </HStack>
                  <Field.Root required gapY={"3"}>
                    <Field.Label fontSize={{ base: "xl", sm: "lg" }}>
                      Email <Field.RequiredIndicator />
                    </Field.Label>
                    <Input
                      type="text"
                      suppressHydrationWarning={true}
                      placeholder="Enter your email"
                      fontSize={{ base: "lg", sm: "md" }}
                      css={{ "--focus-color": "black" }}
                      _placeholder={{ color: "blackAlpha.600" }}
                      color={"#633e24"}
                      {...register("email")}
                      size={{ base: "lg", sm: "md" }}
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
                        {...register("password")}
                        suppressHydrationWarning={true}
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
                      type="submit"
                      suppressHydrationWarning={true}
                      backgroundColor={"#633e27"}
                      alignItems={"center"}
                      marginTop={"2"}
                      fontSize={{ base: "lg", sm: "md" }}
                      disabled={isSubmitting ? true : false}
                      borderRadius={"lg"}
                      w={"full"}
                      color={"white"}
                    >
                      {isSubmitting ? "Creating..." : "Create Account"}
                      <FaArrowRight />
                    </Button>
                  </Field.Root>
                </Fieldset.Content>
              </Fieldset.Root>
            </VStack>
            <Box
              fontFamily={`${zodiak.className}`}
              textAlign={"center"}
              fontSize={{ base: "xl", sm: "lg" }}
              className="font-crismonText"
            >
              If you have an account !{" "}
              <Link href={"/"} className="text-black/90 font-bold">
                <Button
                  suppressHydrationWarning={true}
                  color={"black"}
                  fontWeight={"bolder"}
                >
                  Login Here
                </Button>
              </Link>
            </Box>
          </Box>
        </div>
        <div className="bg-amber-50 w-full h-full"></div>
      </div>
    </>
  );
};

export default Login;
