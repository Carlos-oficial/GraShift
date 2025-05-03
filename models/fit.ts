import { model, models, Schema, Types } from 'mongoose';

export interface IFit {
    name: string;
    note: string;
    fitChecks: Types.ObjectId[];
}

const FitSchema = new Schema<IFit>({
    name: { type: String, required: false },
    note: { type: String, required: false },
    fitChecks: [{ type: Schema.Types.ObjectId, required: true, ref: 'FitCheck' }], // should have at least one fit check
});

const Fit = models.Fit || model<IFit>('Fit', FitSchema);

export default Fit;
