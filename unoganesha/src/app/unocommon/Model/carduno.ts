import { ColorUno } from "../Enum/color"
import { FigureUno } from "../Enum/figure"

export interface ICardUno {
    figure: FigureUno,
    color: ColorUno,
    showBack: boolean;
}
