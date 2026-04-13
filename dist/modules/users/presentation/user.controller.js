import { registerUserSchema } from '../application/dtos/register-user.dto.js';
export class UserController {
    registerUserUseCase;
    constructor(registerUserUseCase) {
        this.registerUserUseCase = registerUserUseCase;
    }
    register = async (req, res, next) => {
        try {
            const dto = registerUserSchema.parse(req.body);
            const user = await this.registerUserUseCase.execute(dto);
            res.status(201).json({
                success: true,
                data: user.toJSON(),
            });
        }
        catch (error) {
            next(error);
        }
    };
}
//# sourceMappingURL=user.controller.js.map