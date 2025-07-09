import {zValidator} from "@hono/zod-validator";
import type {ValidationTargets} from "hono";
import {ZodSchema} from "zod";

export default function validate(
    target: keyof ValidationTargets,
    schema: ZodSchema
) {
    return zValidator(target, schema, (result) => {
        if (!result.success) {
            throw result.error;
        }
    });
}