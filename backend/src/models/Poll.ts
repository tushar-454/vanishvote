import { Document, model, Schema } from 'mongoose';

type Option = {
  text: string;
  votes: number;
};

type Comment = {
  text: string;
  createdAt: Date;
};

type Reactions = {
  like: number;
  trending: number;
};

export type PollType = Document & {
  question: string;
  options: Option[];
  isYesNo: boolean;
  expiresAt: Date;
  isResultHide: boolean;
  isPrivate: boolean;
  reactions: Reactions;
  comments: Comment[];
  createdAt: Date;
};

const PollSchema = new Schema<PollType>({
  question: { type: String, required: true, trim: true },
  options: [
    {
      text: { type: String, required: true },
      votes: { type: Number, default: 0 },
    },
  ],
  isYesNo: { type: Boolean, default: false },
  expiresAt: { type: Date, required: true },
  isResultHide: { type: Boolean, default: false },
  isPrivate: { type: Boolean, default: false },
  reactions: {
    like: { type: Number, default: 0 },
    trending: { type: Number, default: 0 },
  },
  comments: [
    {
      text: { type: String, required: true },
      createdAt: { type: Date, default: Date.now },
    },
  ],
  createdAt: { type: Date, default: Date.now },
});

PollSchema.pre('save', function (next) {
  if (this.isYesNo && this.options.length === 0) {
    this.options = [
      { text: 'Yes', votes: 0 },
      { text: 'No', votes: 0 },
    ];
  }
  next();
});

const Poll = model<PollType>('Poll', PollSchema);
export { Poll };
