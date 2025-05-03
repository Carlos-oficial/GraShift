import { model, models, Schema, Types } from 'mongoose';

export interface weatherData {
    tempmax: number;
    tempmin: number;
    feelslikemax: number;
    feelslikemin: number;
    condition: string;
    note: string;
    icon: string;
    [key: string]: any; // To allow additional properties if needed
}

export interface IFitCheck {
    date: Date;
    weatherData?: weatherData;
    pieceCoords: [{ x: number, y: number}];
    piecesCoords: [id: Types.ObjectId ];
    ocasion?: string;
    note?: string;
    imagePath?: string;
}

const FitCheckSchema = new Schema<IFitCheck>({
    date: { type: Date, required: true },
    weatherData: { 
        type: Object, 
        default: null,
        required: false 
        
    },
    pieceCoords: { 
        type: [{ x: Number, y: Number }], 
        required: true,
        default: [] 
    },
    piecesCoords: { 
        type: [Types.ObjectId], 
        required: true,
        default: [] 

    },
    ocasion: { 
        type: String, 
        default: "other" 
    },
    note: { 
        type: String, 
        default: "" 
    },
    imagePath: { 
        type: String, 
        default: null
    }
});

const FitCheck = models.FitCheck || model<IFitCheck>('FitCheck', FitCheckSchema);

export default FitCheck;
