import { ReactNode, useEffect, useState } from "react";
import { cva } from "class-variance-authority";
import Image from "next/image";
import Head from "next/head";

const shutDownWrapperStyles = cva("h-full w-full", {
  variants: {
    isShutDown: {
      true: "animate-shut-down",
      false: "bg-cover bg-[url(https://cldup.com/gn3s3Fg75t.gif)]",
    },
  },
});

const getChangeOpacityStyles = (afterSeconds: number, baseStyle?: string) => {
  return cva(
    `${
      baseStyle ? `${baseStyle} ` : ""
    }transition-opacity delay-[${afterSeconds}s]`,
    {
      variants: {
        isShutDown: {
          true: "opacity-100",
          false: "opacity-0",
        },
      },
    }
  );
};

const edesurLogoStyles = getChangeOpacityStyles(3);

const titleStyles = getChangeOpacityStyles(4, "text-3xl");

const reflexionsStyles = getChangeOpacityStyles(10, "mt-4");

interface ItemProps {
  children: ReactNode;
  afterSeconds: number;
  isShutDown: boolean;
}

const Item: React.FC<ItemProps> = ({ children, isShutDown, afterSeconds }) => {
  const wrapperStyles = getChangeOpacityStyles(
    afterSeconds,
    "flex flex-col gap-3 items-center max-w-[300px]"
  );

  return (
    <div className={wrapperStyles({ isShutDown })}>
      <p className="text-5xl">🕯️</p>
      <p className="text-sm md:text-base">{children}</p>
    </div>
  );
};

export default function Home() {
  const [isShutDown, setIsShutDown] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsShutDown(true);
    }, 1000);
  }, []);

  return (
    <>
      <Head>
        <title>Villa La Florida Sin Luz</title>
        <meta
          name="description"
          content="En poco más de medio mes, los vecinos del barrio Villa La Florida en Quilmes Oeste llevamos más de 200 horas sin luz. Edesur y el Estado son responsables."
        />
        <link rel="shortcut icon" href="/edesur-logo.png" />
      </Head>

      <main className="bg-black flex justify-center items-center relative text-white text-center">
        <div className="absolute top-0 right-0 w-full h-full">
          <div className={shutDownWrapperStyles({ isShutDown })}></div>
        </div>
        <div className="min-h-screen h-full flex justify-center items-center w-full">
          <div className="flex flex-col gap-y-10 items-center px-8 py-6 w-full h-full">
            <Image
              src="/edesur-logo.png"
              alt="Logo de Edesur"
              width={300}
              height={71}
              className={edesurLogoStyles({ isShutDown })}
              priority
            />

            <h3 className={titleStyles({ isShutDown })}>
              En el mes de Marzo, en el barrio Villa La Florida, Quilmes Oeste,
              Edesur:
            </h3>

            <div className="grid grid-cols-3 gap-x-6">
              <Item isShutDown={isShutDown} afterSeconds={6}>
                No fue capaz de garantizar durante 72 hs consecutivas el
                servicio
              </Item>
              <Item isShutDown={isShutDown} afterSeconds={7}>
                De 400 horas (hasta el 17/03/2023) que lleva el mes, el servicio
                estuvo cortado más de 200 horas
              </Item>
              <Item isShutDown={isShutDown} afterSeconds={8}>
                Todos los medios de contacto de la empresa son inaccesibles. No
                hay manera de contactar a la empresa.
              </Item>
            </div>

            <div className={reflexionsStyles({ isShutDown })}>
              <p>
                Los vecinos estamos abandonados y sin respuestas. Nadie se hace
                cargo de la mercadería, electrodomésticos quemados y tiempo
                perdido de sus usuarios.
              </p>
            </div>

            <div className={reflexionsStyles({ isShutDown })}>
              <p className="text-3xl text-red-700">
                Edesur y el estado son responsables del abandono de la gente.
                Queremos respuestas YA.
              </p>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
