import type { Api } from '@/typings/api';

export enum PaperStatus {
  Unprocessed = 0,
  Processed = 1,
  Deprecated = 2
}
export const defaultPaper: Api.Paper.PaperRecord = {
  deleterId: null,
  deletionTime: null,
  lastModificationTime: null,
  lastModifierId: null,
  completeTime: null,
  creationTime: null,
  creatorId: '',
  id: '',
  isDeleted: false,
  note: null,
  receiveTime: null,
  receiverId: null,
  receiverName: '',
  solution: null,
  status: PaperStatus.Unprocessed,
  worker2Id: null,
  worker2Name: null,
  workerId: null,
  workerName: null,
  name: '',
  phoneNumber: '',
  address: '',
  problemType: '',
  problemDescription: ''
};
