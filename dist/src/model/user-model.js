"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toUserResponse = toUserResponse;
// function untuk mengkonversi model dr schema prisma jadi UserResponse
function toUserResponse(user) {
    return {
        name: user.name,
        username: user.username,
    };
}
