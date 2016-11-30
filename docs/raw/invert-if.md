# Inverting `if` statements

While this might sound somewhat daunting, it's actually quite easy. Take this code for an example:

```java
@EventHandler
public void onInteract(PlayerInteractEvent e) {
    Player player = e.getPlayer();
    ItemStack item = player.getInventory().getItemInMainHand();

    if (item != null) {
        if (item.getType() == Material.DIAMOND) {
            if (item.hasItemMeta()) {
                if (item.getItemMeta().hasDisplayName()) {
                    if (item.getItemMeta().getDisplayName().equals("Thor's Diamond")) {
                        Block block = e.getClickedBlock();
                        if (block.getType() == Material.BEACON) {
                            if (player.hasPermission("ThorDiamond.use")) {
                                e.setCancelled(true);
                                block.getWorld().strikeLightning(block.getLocation());
                            } else {
                                player.sendMessage(ChatColor.RED + "You don't have permission to do that!");
                            }
                        } else {
                            player.sendMessage("Click a beacon to strike lightning!");
                        }
                    }
                }
            }
        }
    }
}
```

There are nested `if` statements in that code that are seven deep! This is sub-optimal, and the code would be much better if we invert the statements:

```java
@EventHandler
public void onInteract(PlayerInteractEvent e) {
    Player player = e.getPlayer();
    ItemStack item = player.getInventory().getItemInMainHand();

    if (item == null) {
        return;
    }

    if (item.getType() != Material.DIAMOND) {
        return;
    }

    if (!item.hasItemMeta()) {
        return;
    }

    if (!item.getItemMeta().hasDisplayName()) {
        return;
    }

    if (!item.getItemMeta().getDisplayName().equals("Thor's Diamond")) {
        return;
    }

    Block block = e.getClickedBlock();
    if (block.getType() != Material.BEACON) {
        player.sendMessage("Click a beacon to strike lightning!");
        return;
    }

    if (!player.hasPermission("ThorDiamond.use")) {
        player.sendMessage(ChatColor.RED + "You don't have permission to do that!");
        return;
    }

    e.setCancelled(true);
    block.getWorld().strikeLightning(block.getLocation());
}
```

While it's more lines of code, the logic of the code above is **much** easier to follow. Is the item `null`? Stop this method. Is the item something other than a diamond? Stop this method. Does the item have no meta? Stop this method. You get the idea. Another benefit is that `else` statements are compacted into the inverted `if` statement, and that makes them much easier to follow. With the nested `if` statements, it can be hard to tell what `else` goes with what `if`. The above code can be compacted even further by merging `if` statements, and it's still very easy to understand the logic:

```java
@EventHandler
public void onInteract(PlayerInteractEvent e) {
    Player player = e.getPlayer();
    ItemStack item = player.getInventory().getItemInMainHand();

    if (item == null || item.getType() != Material.DIAMOND) {
        return;
    }

    if (!item.hasItemMeta() || !item.getItemMeta().hasDisplayName()) {
        return;
    }

    if (!item.getItemMeta().getDisplayName().equals("Thor's Diamond")) {
        return;
    }


    Block block = e.getClickedBlock();
    if (block.getType() != Material.BEACON) {
        player.sendMessage("Click a beacon to strike lightning!");
        return;
    }

    if (!player.hasPermission("ThorDiamond.use")) {
        player.sendMessage(ChatColor.RED + "You don't have permission to do that!");
        return;
    }

    e.setCancelled(true);
    block.getWorld().strikeLightning(block.getLocation());
}
```

Because of the order of the resolution of logic in the `if` statements, you can compact it very easily. For example, in the first `if` statement, if `item == null` then `item.getType()` would cause a `NullPointerException`. However, since `item == null` comes first, if it resolves to `true` then the OR (`||`) knows it doesn't have to resolve any other part of the logic. `true` OR anything is still `true`. The same is true for the second set of checks. If the item has no item meta, then calling a method on the item's meta would cause a `NullPointerException`. However, due to the nature of the OR statement, if the item has no item meta it won't even try to resolve the second logical check.
