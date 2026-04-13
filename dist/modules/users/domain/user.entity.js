export class User {
    props;
    constructor(props) {
        this.props = props;
    }
    get id() { return this.props.id; }
    get email() { return this.props.email; }
    get password() { return this.props.password; }
    get firstName() { return this.props.firstName; }
    get lastName() { return this.props.lastName; }
    get createdAt() { return this.props.createdAt; }
    get updatedAt() { return this.props.updatedAt; }
    toJSON() {
        return {
            id: this.id,
            email: this.email,
            firstName: this.firstName,
            lastName: this.lastName,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
        };
    }
}
//# sourceMappingURL=user.entity.js.map