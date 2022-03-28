export interface Characters {
    char_id: number;
    name: string;
    birthday: Birthday;
    occupation: string[];
    img: string;
    status: Status;
    nickname: string;
    appearance: number[];
    portrayed: string;
    category: Category;
    better_call_saul_appearance: number[];
}

export enum Birthday {
    The07081993 = "07-08-1993",
    The08111970 = "08-11-1970",
    The09071958 = "09-07-1958",
    The09241984 = "09-24-1984",
    Unknown = "Unknown",
}

export enum Category {
    BetterCallSaul = "Better Call Saul",
    BreakingBad = "Breaking Bad",
    BreakingBadBetterCallSaul = "Breaking Bad, Better Call Saul",
}

export enum Status {
    Alive = "Alive",
    Deceased = "Deceased",
    PresumedDead = "Presumed dead",
    Unknown = "Unknown",
}

// Converts JSON strings to/from your types
// and asserts the results of JSON.parse at runtime
export class Convert {
    public static toCharacters(json: string): Characters[] {
        return cast(JSON.parse(json), a(r("Characters")));
    }

    public static charactersToJson(value: Characters[]): string {
        return JSON.stringify(uncast(value, a(r("Characters"))), null, 2);
    }
}

function invalidValue(typ: any, val: any, key: any = ''): never {
    if (key) {
        throw Error(`Invalid value for key "${key}". Expected type ${JSON.stringify(typ)} but got ${JSON.stringify(val)}`);
    }
    throw Error(`Invalid value ${JSON.stringify(val)} for type ${JSON.stringify(typ)}`,);
}

function jsonToJSProps(typ: any): any {
    if (typ.jsonToJS === undefined) {
        const map: any = {};
        typ.props.forEach((p: any) => map[p.json] = { key: p.js, typ: p.typ });
        typ.jsonToJS = map;
    }
    return typ.jsonToJS;
}

function jsToJSONProps(typ: any): any {
    if (typ.jsToJSON === undefined) {
        const map: any = {};
        typ.props.forEach((p: any) => map[p.js] = { key: p.json, typ: p.typ });
        typ.jsToJSON = map;
    }
    return typ.jsToJSON;
}

function transform(val: any, typ: any, getProps: any, key: any = ''): any {
    function transformPrimitive(typ: string, val: any): any {
        if (typeof typ === typeof val) return val;
        return invalidValue(typ, val, key);
    }

    function transformUnion(typs: any[], val: any): any {
        // val must validate against one typ in typs
        const l = typs.length;
        for (let i = 0; i < l; i++) {
            const typ = typs[i];
            try {
                return transform(val, typ, getProps);
            } catch (_) { }
        }
        return invalidValue(typs, val);
    }

    function transformEnum(cases: string[], val: any): any {
        if (cases.indexOf(val) !== -1) return val;
        return invalidValue(cases, val);
    }

    function transformArray(typ: any, val: any): any {
        // val must be an array with no invalid elements
        if (!Array.isArray(val)) return invalidValue("array", val);
        return val.map(el => transform(el, typ, getProps));
    }

    function transformDate(val: any): any {
        if (val === null) {
            return null;
        }
        const d = new Date(val);
        if (isNaN(d.valueOf())) {
            return invalidValue("Date", val);
        }
        return d;
    }

    function transformObject(props: { [k: string]: any }, additional: any, val: any): any {
        if (val === null || typeof val !== "object" || Array.isArray(val)) {
            return invalidValue("object", val);
        }
        const result: any = {};
        Object.getOwnPropertyNames(props).forEach(key => {
            const prop = props[key];
            const v = Object.prototype.hasOwnProperty.call(val, key) ? val[key] : undefined;
            result[prop.key] = transform(v, prop.typ, getProps, prop.key);
        });
        Object.getOwnPropertyNames(val).forEach(key => {
            if (!Object.prototype.hasOwnProperty.call(props, key)) {
                result[key] = transform(val[key], additional, getProps, key);
            }
        });
        return result;
    }

    if (typ === "any") return val;
    if (typ === null) {
        if (val === null) return val;
        return invalidValue(typ, val);
    }
    if (typ === false) return invalidValue(typ, val);
    while (typeof typ === "object" && typ.ref !== undefined) {
        typ = typeMap[typ.ref];
    }
    if (Array.isArray(typ)) return transformEnum(typ, val);
    if (typeof typ === "object") {
        return typ.hasOwnProperty("unionMembers") ? transformUnion(typ.unionMembers, val)
            : typ.hasOwnProperty("arrayItems") ? transformArray(typ.arrayItems, val)
                : typ.hasOwnProperty("props") ? transformObject(getProps(typ), typ.additional, val)
                    : invalidValue(typ, val);
    }
    // Numbers can be parsed by Date but shouldn't be.
    if (typ === Date && typeof val !== "number") return transformDate(val);
    return transformPrimitive(typ, val);
}

function cast<T>(val: any, typ: any): T {
    return transform(val, typ, jsonToJSProps);
}

function uncast<T>(val: T, typ: any): any {
    return transform(val, typ, jsToJSONProps);
}

function a(typ: any) {
    return { arrayItems: typ };
}

function u(...typs: any[]) {
    return { unionMembers: typs };
}

function o(props: any[], additional: any) {
    return { props, additional };
}

function m(additional: any) {
    return { props: [], additional };
}

function r(name: string) {
    return { ref: name };
}

const typeMap: any = {
    "Characters": o([
        { json: "char_id", js: "char_id", typ: 0 },
        { json: "name", js: "name", typ: "" },
        { json: "birthday", js: "birthday", typ: r("Birthday") },
        { json: "occupation", js: "occupation", typ: a("") },
        { json: "img", js: "img", typ: "" },
        { json: "status", js: "status", typ: r("Status") },
        { json: "nickname", js: "nickname", typ: "" },
        { json: "appearance", js: "appearance", typ: a(0) },
        { json: "portrayed", js: "portrayed", typ: "" },
        { json: "category", js: "category", typ: r("Category") },
        { json: "better_call_saul_appearance", js: "better_call_saul_appearance", typ: a(0) },
    ], false),
    "Birthday": [
        "07-08-1993",
        "08-11-1970",
        "09-07-1958",
        "09-24-1984",
        "Unknown",
    ],
    "Category": [
        "Better Call Saul",
        "Breaking Bad",
        "Breaking Bad, Better Call Saul",
    ],
    "Status": [
        "Alive",
        "Deceased",
        "Presumed dead",
        "Unknown",
    ],
};
