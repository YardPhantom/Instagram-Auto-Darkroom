DARKROOM for IIS 10
===================

Account: Lookinggoodmodel
Inbox:   C:\projects\InstagramAuto
Done:    C:\projects\InstagramAuto\done

Each day Darkroom picks 1–3 posts at random times (at least 90 minutes
apart, outside quiet hours 23:00–07:30). Used media + annotation files
move to done after a successful post.

Extract this folder to C:\projects\Darkroom (keep it out of the media inbox).

1. Install Python 3.11+ and the IIS HttpPlatformHandler module.
2. Run setup.ps1
3. In IIS Manager, add a site whose physical path is this folder.
4. Put photos/videos in C:\projects\InstagramAuto with a matching
   annotation file (same name, .txt / .caption / .json).
5. Open the site, enter the Instagram password for Lookinggoodmodel, press Start.

JSON annotation example:

  { "caption": "Salt air.", "comment": "Shot on 35." }

Without IIS you can run run.bat and open the site in a browser.
