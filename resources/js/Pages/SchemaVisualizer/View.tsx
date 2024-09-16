import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';


import React, { useCallback } from 'react';
import {
    ReactFlow,
    MiniMap,
    Controls,
    Background,
    useNodesState,
    useEdgesState,
    addEdge,
    type OnConnect,
    BackgroundVariant,
    Node,
    Edge,
    // Panel
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { getInfoFromSchema } from './utils';
import { schema } from './constants';
import ModelNode from './ModelNode';


// const initialNodes = [
//     { id: '1', position: { x: 0, y: 0 }, data: { label: '1' }, type: 'input' },
//     { id: '2', position: { x: 0, y: 100 }, data: { label: '2' }, type: 'output' },
//     { id: '3', position: { x: 50, y: 200 }, data: { value: '2' }, type: 'textUpdater', },
// ];
// const initialEdges = [
//     { id: 'e1-2', source: '1', target: '2', type: 'step' },
//     { id: 'e1-3', source: '1', target: '3', type: 'step' }
// ];

const { models, connections } = getInfoFromSchema(schema);


let row = 0;
let column = 0;
const numModels = models.length;
let numGrid = 1;

while (1) {
    if (numGrid ** 2 >= numModels) {
        break;
    }
    numGrid++;
}

const initialNodes: Node[] = models.map((model, index) => {
    const x = row * 300;
    const y = column * 300;

    if (numGrid % index === 0) {
        column = 0;
        row += 1
    } else {
        column += 1;
    }

    return {
        id: model.name,
        position: { x, y },
        data: model,
        type: "model"
    }
})

const initialEdges: Edge[] = connections.map(conn => {
    const sourceId = `${conn.source}-${conn.name}`
    return {
        id: sourceId,
        source: conn.source,
        target: conn.target,
        sourceHandle: sourceId,
        targetHandle: conn.target,
        animated: true,
    }
});

// const initialEdges = [
//     { id: 'e1-2', source: '1', target: '2', type: 'step' },
//     { id: 'e1-3', source: '1', target: '3', type: 'step' }
// ];

const modelTypes = {
    model: ModelNode
}


export default function App() {
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

    // console.log(models)
    // const onConnect: OnConnect = useCallback(
    //     (params) => setEdges((eds) => addEdge(params, eds)),
    //     [setEdges],
    // );

    return (
        <div className="w-screen h-screen bg-slate-950">
            <ReactFlow
                defaultNodes={nodes}
                defaultEdges={edges}
                nodeTypes={modelTypes}
                fitView
                fitViewOptions={{ padding: 0.4 }}
            >
                <Background color='#222' variant={BackgroundVariant.Lines}></Background>
                <Controls />
            </ReactFlow>
        </div>
    );
}





// import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
// import { Head } from '@inertiajs/react';

// export default function Dashboard() {
//     return (
//         <AuthenticatedLayout
//             header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
//         >
//             <Head title="Dashboard" />

//             <div className="py-12">
//                 <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
//                     <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
//                         <div className="p-6 text-gray-900">You're logged in!</div>
//                     </div>
//                 </div>
//             </div>
//         </AuthenticatedLayout>
//     );
// }
