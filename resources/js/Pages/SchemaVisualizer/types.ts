// export type Model = {
//   id: string,
//   position: {
//     x: number;
//     y: number;
//   },
//   data: {},
//   name: string;
//   field: {
//     name: string;
//     type: string;
//     hasConnections?: boolean;
//   }[];
//   isChild?: boolean;
// }

export type Model = {
  name: string;
  fields: {
    name: string;
    type: string;
    hasConnections?: boolean;
  }[];
  isChild?: boolean;
}


// export type Model = Node<{
//   name: string;
//   field: {
//     name: string;
//     type: string;
//     hasConnections?: boolean;
//   }[];
//   isChild?: boolean;
// }>



export type ModelConnection = {
  target: string;
  source: string;
  name: string;
}