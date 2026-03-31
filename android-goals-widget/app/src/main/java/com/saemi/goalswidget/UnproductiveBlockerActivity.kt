package com.saemi.goalswidget

import android.app.Activity
import android.os.Bundle
import android.view.WindowManager
import android.widget.Button
import android.widget.TextView

class UnproductiveBlockerActivity : Activity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        window.addFlags(
            WindowManager.LayoutParams.FLAG_NOT_TOUCH_MODAL or
                WindowManager.LayoutParams.FLAG_LAYOUT_IN_SCREEN or
                WindowManager.LayoutParams.FLAG_FULLSCREEN
        )

        setContentView(R.layout.activity_unproductive_blocker)

        findViewById<TextView?>(R.id.blockerMessage)?.text =
            getString(R.string.unproductive_blocker_message)

        findViewById<Button?>(R.id.blockerCloseButton)?.setOnClickListener {
            finish()
        }
    }
}

