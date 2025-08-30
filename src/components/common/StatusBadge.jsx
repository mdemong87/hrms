import { CheckCircle2, Clock3, XCircle } from "lucide-react";
import { GrFormView } from "react-icons/gr";



function StatusBadge({ status }) {
    const map = {
        approved: {
            icon: <CheckCircle2 className="h-4 w-4" aria-hidden />,
            classes:
                "bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-300 dark:ring-emerald-700/50",
            label: "Approved",
        },
        pending: {
            icon: <Clock3 className="h-4 w-4" aria-hidden />,
            classes:
                "bg-amber-50 text-amber-700 ring-1 ring-inset ring-amber-200 dark:bg-amber-500/10 dark:text-amber-300 dark:ring-amber-700/50",
            label: "Pending",
        },
        rejected: {
            icon: <XCircle className="h-4 w-4" aria-hidden />,
            classes:
                "bg-rose-50 text-rose-700 ring-1 ring-inset ring-rose-200 dark:bg-rose-500/10 dark:text-rose-300 dark:ring-rose-700/50",
            label: "Rejected",
        },

        in_review: {
            icon: <GrFormView className="h-4 w-4" aria-hidden />,
            classes:
                "bg-blue-50 text-blue-700 ring-1 ring-inset ring-blue-200 dark:bg-blue-500/10 dark:text-blue-300 dark:ring-blue-700/50",
            label: "In Review",
        },
    };
    const s = map[status] ?? map.pending;
    return (
        <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${s.classes}`}>
            {s.icon}
            {s.label}
        </span>
    );
}


export default StatusBadge;