import { Layout } from 'buffer-layout';
import { IdlField, IdlTypeDef } from '../../anchor';
export declare class IdlCoder {
    static fieldLayout(field: {
        name?: string;
    } & Pick<IdlField, 'type'>, types?: IdlTypeDef[]): Layout;
}
//# sourceMappingURL=idl.d.ts.map