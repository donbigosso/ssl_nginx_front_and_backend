<?php
/**
 * Server-rendered Open Graph preview for gallery / picture links.
 *
 * This is NOT part of the JSON API dispatcher (api_engine.php). It is a
 * standalone HTML endpoint meant to be hit only by link-preview bots
 * (WhatsApp, Facebook, Twitter/X, Discord, Slack, Telegram, LinkedIn),
 * via an nginx rewrite on the frontend host. Real visitors are redirected
 * straight into the static SPA and never see this page rendered.
 *
 * Usage:
 *   /backend/og_preview.php?id={gallery_id}
 *   /backend/og_preview.php?id={gallery_id}&picid={media_item_id}
 */

include 'classes/core.php';
include 'classes/db_access.php';
include 'classes/gallery_model.php';

// ---- Config -----------------------------------------------------------

const FRONTEND_BASE = 'https://donbigosso.polafri.pl';
const MEDIA_BASE    = 'https://donbigosso.polafri.pl/backend/media_items/';
const FALLBACK_IMAGE = 'https://donbigosso.polafri.pl/images/logo.png';
const SITE_NAME      = 'Donbigosso';

// ---- Input --------------------------------------------------------------

$galleryId = isset($_GET['id']) ? (int)$_GET['id'] : 0;
$picId     = isset($_GET['picid']) ? (int)$_GET['picid'] : 0;

$redirectUrl = FRONTEND_BASE . '/galleries/preview_gallery.html?id=' . $galleryId;
if ($picId > 0) {
    $redirectUrl .= '&picid=' . $picId;
}

// ---- Defaults (used if gallery/picture can't be resolved) ---------------

$ogTitle = SITE_NAME . ' Galleries';
$ogDescription = 'Beautiful galleries by Donbigosso';
$ogImage = FALLBACK_IMAGE;

// ---- Resolve real data ----------------------------------------------------

if ($galleryId > 0) {
    try {
        $db = getenv('MYSQL_DATABASE');
        $user = getenv('MYSQL_USER');
        $pass = getenv('MYSQL_PASSWORD');
        $dba = new DatabaseAccess('mysql', $db, $user, $pass);
        $galleryModel = new GalleryModel($dba);

        $gallery = $galleryModel->get_gallery_by_id($galleryId);

        if ($gallery !== null) {
            $ogTitle = ($gallery['title'] ?: 'Gallery') . ' — ' . SITE_NAME;
            $ogDescription = $gallery['title'] ?: 'Beautiful galleries by Donbigosso';

            // Gallery-level cover miniature as default image
            $cover = $galleryModel->get_gallery_cover_miniature_filename($galleryId);
            if ($cover['success'] && !empty($cover['filename'])) {
                $ogImage = MEDIA_BASE . rawurlencode($cover['filename']);
            }

            // If a specific picture is being previewed, override with its own title + miniature
            if ($picId > 0) {
                $mediaResult = $galleryModel->get_gallery_media_item($galleryId, $picId);
                if ($mediaResult['success'] && $mediaResult['media'] !== null) {
                    $media = $mediaResult['media'];
                    $ogTitle = ($media['title'] ?: 'Picture') . ' — ' . ($gallery['title'] ?: 'Gallery') . ' — ' . SITE_NAME;
                    $ogDescription = $media['title'] ?: ($gallery['title'] ?: 'Beautiful galleries by Donbigosso');

                    if (!empty($media['miniature_filename'])) {
                        $ogImage = MEDIA_BASE . rawurlencode($media['miniature_filename']);
                    } elseif (!empty($media['filename'])) {
                        $ogImage = MEDIA_BASE . rawurlencode($media['filename']);
                    }
                }
            }
        }
    } catch (Throwable $e) {
        // Swallow errors — fall back to defaults set above, never expose internals to bots.
    }
}

// ---- Output ---------------------------------------------------------------

function og_escape(string $value): string
{
    return htmlspecialchars($value, ENT_QUOTES, 'UTF-8');
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title><?= og_escape($ogTitle) ?></title>
    <meta property="og:title" content="<?= og_escape($ogTitle) ?>">
    <meta property="og:description" content="<?= og_escape($ogDescription) ?>">
    <meta property="og:type" content="website">
    <meta property="og:url" content="<?= og_escape($redirectUrl) ?>">
    <meta property="og:image" content="<?= og_escape($ogImage) ?>">
    <meta property="og:image:width" content="400">
    <meta property="og:image:height" content="400">
    <meta name="twitter:card" content="summary">
    <meta name="twitter:title" content="<?= og_escape($ogTitle) ?>">
    <meta name="twitter:description" content="<?= og_escape($ogDescription) ?>">
    <meta name="twitter:image" content="<?= og_escape($ogImage) ?>">

    <meta http-equiv="refresh" content="0; url=<?= og_escape($redirectUrl) ?>">
    <script>window.location.replace(<?= json_encode($redirectUrl) ?>);</script>
</head>
<body>
    <p>Redirecting to <a href="<?= og_escape($redirectUrl) ?>"><?= og_escape($ogTitle) ?></a>…</p>
</body>
</html>
