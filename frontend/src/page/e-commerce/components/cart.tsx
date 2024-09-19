import { Minus, Plus, ShoppingCart } from "lucide-react";
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "../components/sheet";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Blusa from "../img/blusa.png";
import { useState } from "react";
import axios from 'axios';

export default function Cart() {
    const [quantity, setQuantity] = useState<number>(1);
    const [cep, setCep] = useState<string>('');
    const [deliveryTime, setDeliveryTime] = useState<string>('Prazo de 30 dias úteis');
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');

    const handleQuantityChange = (increment: boolean) => {
        setQuantity((prevQuantity: number) => {
            const newQuantity = increment ? prevQuantity + 1 : prevQuantity - 1;
            return newQuantity < 1 ? 1 : newQuantity;
        });
    };

    const handleCepChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCep(event.target.value);
    };

    const calculateDeliveryTime = async () => {
        setLoading(true);
        setError('');
        try {
            const response = await axios.post(
                'https://api.correios.com.br/v1/frete/calcular',
                {
                    cepDestino: cep,
                    // Inclua outros parâmetros necessários aqui
                },
                {
                    headers: {
                        'Authorization': `Bearer YOUR_ACCESS_TOKEN`,
                        'Content-Type': 'application/json',
                    }
                }
            );
            const prazo = response.data.prazo; // Ajuste conforme a resposta da API
            setDeliveryTime(`Prazo estimado: ${prazo}`);
        } catch (error) {
            console.error("Erro ao calcular o prazo de entrega:", error);
            setError('Erro ao calcular o prazo de entrega');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Sheet>
            <SheetTrigger asChild>
                <ShoppingCart className="cursor-pointer" width={22} />
            </SheetTrigger>
            <SheetContent>
                <SheetHeader className="p-6">
                    <SheetTitle className="uppercase">Carrinho</SheetTitle>
                </SheetHeader>
                <Separator className="w-full" />
                <div className="w-full">
                    <div className="flex relative flex-row items-center bg-zinc-400/10 dark:bg-neutral-800/30 h-[120px]">
                        <div className="ml-3">
                            <img className="h-24" src={Blusa} alt="" />
                        </div>
                        <div className="flex flex-col ml-4">
                            <h1 className="text-xl">Calça Aperta ovo</h1>
                            <p className="text-muted-foreground text-sm">Urban Brown I GG</p>
                            <div className="flex w-24 mt-2 justify-center rounded-full relative items-center">
                                <Input
                                    className="h-7 pl-6 text-center rounded-lg bg-[#F0F0F0] dark:bg-zinc-950"
                                    type="number"
                                    value={quantity}
                                    readOnly
                                />
                                <Minus
                                    width={17}
                                    height={17}
                                    onClick={() => handleQuantityChange(false)}
                                    className="left-3 absolute cursor-pointer"
                                />
                                <Plus
                                    width={17}
                                    height={17}
                                    onClick={() => handleQuantityChange(true)}
                                    className="absolute right-3 cursor-pointer"
                                />
                            </div>
                        </div>
                        <h1 className="absolute top-5 right-4 underline cursor-pointer text-sm">Remover</h1>
                        <h1 className="absolute bottom-5 right-4 font-semibold">$140.00</h1>
                    </div>
                </div>
                <SheetFooter className="absolute flex flex-col p-5 justify-center items-center w-full bottom-0">
                    <Separator className="my-6" />
                    <div className="w-full">
                        <h1>Simule seu prazo de entrega</h1>
                    </div>
                    <div className="flex mt-3 flex-row w-full gap-3">
                        <Input
                            className="w-2/4 h-10"
                            placeholder="Insira seu CEP"
                            value={cep}
                            onChange={handleCepChange}
                        />
                        <Button
                            className="w-2/4 h-10 uppercase"
                            onClick={calculateDeliveryTime}
                            disabled={loading}
                        >
                            {loading ? 'Calculando...' : 'Calcular'}
                        </Button>
                    </div>
                    <div className="w-full mt-3">
                        <h1>{error ? error : deliveryTime}</h1>
                    </div>
                    <Separator className="my-6" />
                    <div className="w-full flex justify-between">
                        <h1 className="uppercase font-semibold">Subtotal</h1>
                        <h1>$140.00</h1>
                    </div>
                    <Separator className="my-6" />
                    <div className="w-full flex flex-col gap-2">
                        <Button className="w-full h-12 uppercase font-semibold">Finalizar Compra</Button>
                        <SheetClose>
                            <Button variant="ghost" className="w-full font-bold uppercase h-12 underline hover:bg-transparent">
                                Continuar Comprando
                            </Button>
                        </SheetClose>
                    </div>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    );
}