val myEntry = <ore:myOwnEntry>;
recipes.addShaped(<aoa3:magic_repair_dust>*1,[[myEntry,<minecraft:sand>,myEntry],
[<minecraft:diamond>,<minecraft:sand>,<minecraft:diamond>],
[<aoa3:jade>,<minecraft:sand>,<aoa3:jade>]]);

mods.jei.JEI.addDescription(<aoa3:magic_repair_dust>,"这个配方是整合包作者自己加的，原本不能合成。
     ————整合包作者：末日鹤翊");
mods.jei.JEI.addDescription(<minecraft:enchanted_book>.withTag({StoredEnchantments: [{lvl: 1 as short, id: 70 as short}]}),"手持带有经验修补附魔的物品，shift长按右键即可消耗经验进行修补。吸收经验同样也可以修补带有经验修补附魔的物品。此配方由整合包作者末日鹤翊添加，原本不能以此方式合成。");