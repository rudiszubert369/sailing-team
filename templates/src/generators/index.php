<?php
function includeFromGlobs(array $globs) {
    foreach ($globs as $glob) {
        foreach (glob($glob) as $file) {
            include $file;
        }
    }
}

includeFromGlobs([
    $root_path . '/generators/components/*.php',
    $root_path . '/generators/modules/*.php',
]);
?>
