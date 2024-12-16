import AuthenticatedSideLayout from "@/Layouts/AuthenticatedSideLayout";

import { memo } from "react";
import { Head } from "@inertiajs/react";
import TotallingTable, { TableProps } from "./Table";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const Totalling = ({ flows }: TableProps) => {
    return (
        <AuthenticatedSideLayout>
            <Head title="Setting" />
            <div className="py-6">
                <QueryClientProvider client={queryClient}>
                    <TotallingTable flows={flows} />
                </QueryClientProvider>
            </div>
        </AuthenticatedSideLayout>
    );
};

export default memo(Totalling);
