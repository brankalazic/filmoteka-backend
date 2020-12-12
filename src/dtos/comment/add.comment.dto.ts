export class AddCommentDto {
    userId: number;
    movieId: number;
    originalValue: string;
    moderatedValue?: string | null;
    ratingValue: number;
    status: "pending" | "approved" | "denied";
    moderatorAdministratorId?: number | null;
}