import { model, models, Schema, Types } from 'mongoose';

export interface IPiece {
    id: string;
    name: string;
    description?: string; // optional field for description
    materials?: string[]; // optional field for materials
    type: "top" | "bottom" | "dress" | "outerwear" | "shoes" | "accessory" | "other";
    colors: string[];
    images?: string[]; // optional field for images
}

const PieceSchema = new Schema<IPiece>({
    id: { type: String, required: true },
    name: { type: String, required: true },
    description: { type: String }, // optional field for description
    materials: [{ type: String }], // optional field for materials
    type: { type: String, required: true, enum: ["top", "bottom", "dress", "outerwear", "shoes", "accessory", "other"] },
    colors: [{ type: String, required: true }],
    images: [{ type: String }] // optional field for images
});

const Piece = models.Piece || model<IPiece>('Piece', PieceSchema);

export default Piece;
