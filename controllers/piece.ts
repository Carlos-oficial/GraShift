import { CourseDB } from '@/lib/types';
import Piece from '@/models/piece';

export const list = () => {
  return Piece.find().exec();
};

export const listByIds = (ids: string[]) => {
  return Piece.find({ _id: { $in: ids } }).exec();
};

export const get = (id: string) => {
  return Piece.findById(id).exec();
};

export const create = (piece: Partial<CourseDB>) => {
  return Piece.create(piece);
};

export const update = (id: string, piece: Partial<CourseDB>) => {
  return Piece.findByIdAndUpdate(id, piece).exec();
};
