declare const PHYSICAL_ITEM_TYPES: Set<"ammo" | "armor" | "backpack" | "book" | "consumable" | "equipment" | "shield" | "treasure" | "weapon">;
declare const PRECIOUS_MATERIAL_TYPES: Set<"abysium" | "adamantine" | "cold-iron" | "duskwood" | "djezet" | "dragonhide" | "dreamweb" | "grisantian-pelt" | "inubrix" | "keep-stone" | "dawnsilver" | "noqual" | "orichalcum" | "peachwood" | "siccatite" | "silver" | "sisterstone" | "sisterstone-dusk" | "sisterstone-scarlet" | "sloughstone" | "sovereign-steel" | "warpglass">;
declare const PRECIOUS_MATERIAL_GRADES: Set<"low" | "standard" | "high">;
declare const COIN_DENOMINATIONS: readonly ["pp", "gp", "sp", "cp"];
declare const CURRENCY_TYPES: readonly ["pp", "gp", "sp", "cp", "credits", "upb"];
declare const DENOMINATION_RATES: {
    cp: number;
    sp: number;
    gp: number;
    pp: number;
    credits: number;
    upb: number;
};
declare const COIN_DENOMINATION_BY_VALUE: any;
export { COIN_DENOMINATION_BY_VALUE, COIN_DENOMINATIONS, CURRENCY_TYPES, DENOMINATION_RATES, PHYSICAL_ITEM_TYPES, PRECIOUS_MATERIAL_GRADES, PRECIOUS_MATERIAL_TYPES, };
