package com.saemi.goalswidget

import org.junit.Assert.assertEquals
import org.junit.Test

class BrowserSitesTest {
    @Test
    fun youtubeAndInstagramHostsCountAsTargets() {
        assertEquals(BrowserSites.YOUTUBE, BrowserSites.siteForUrl("https://www.youtube.com/watch?v=abc"))
        assertEquals(BrowserSites.YOUTUBE, BrowserSites.siteForUrl("https://m.youtube.com/shorts/abc"))
        assertEquals(BrowserSites.YOUTUBE, BrowserSites.siteForUrl("youtu.be/abc"))
        assertEquals(BrowserSites.INSTAGRAM, BrowserSites.siteForUrl("https://www.instagram.com/reel/xyz"))
        assertEquals(BrowserSites.INSTAGRAM, BrowserSites.siteForUrl("https://instagr.am/p/xyz"))
        assertEquals(BrowserSites.NONE, BrowserSites.siteForUrl("https://www.google.com/search?q=cats"))
        assertEquals(BrowserSites.NONE, BrowserSites.siteForUrl("https://notyoutube.com/watch"))
        assertEquals(BrowserSites.NONE, BrowserSites.siteForUrl(""))
    }
}
