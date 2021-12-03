package com.example.myapplication;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;

import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;
import android.widget.Toast;

import com.google.android.gms.tasks.OnCompleteListener;
import com.google.android.gms.tasks.OnFailureListener;
import com.google.android.gms.tasks.OnSuccessListener;
import com.google.android.gms.tasks.Task;
import com.google.firebase.firestore.DocumentReference;
import com.google.firebase.firestore.FirebaseFirestore;
import com.google.firebase.firestore.QueryDocumentSnapshot;
import com.google.firebase.firestore.QuerySnapshot;

import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.Locale;
import java.util.Map;
import java.util.Objects;

public class MainActivity extends AppCompatActivity {

    public static final String EMAIL_KEY = "Email";
    public static final String NAME_KEY = "Name";
    public static final String TAG = "UserInformation";


    EditText nameInput;
    EditText emailInput;

    TextView mUserDataTextView;

    FirebaseFirestore db = FirebaseFirestore.getInstance();

    ArrayList<String> userList = new ArrayList<>();


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        mUserDataTextView = (TextView) findViewById(R.id.textView6);
    }

    public void saveSubmit(View view){
        nameInput = (EditText)  findViewById(R.id.nameInput);
        emailInput = (EditText) findViewById(R.id.emailInput);

        Map<String, Object> user = new HashMap<>();

        user.put(NAME_KEY, nameInput.getText().toString());
        user.put(EMAIL_KEY, emailInput.getText().toString());

        db.collection("users")
                .add(user)
                .addOnSuccessListener(new OnSuccessListener<DocumentReference>() {
                    @Override
                    public void onSuccess(DocumentReference documentReference) {
                        Log.d(TAG, "DocumentSnapshot added with ID: " + documentReference.getId());
                    }
                })
                .addOnFailureListener(new OnFailureListener() {
                    @Override
                    public void onFailure(@NonNull Exception e) {
                        Log.w(TAG, "Error adding document", e);
                    }
                });
    }

    public void fetchQuote(View view){
        db.collection("users")
                .get()
                .addOnCompleteListener(new OnCompleteListener<QuerySnapshot>() {
                    @Override
                    public void onComplete(@NonNull Task<QuerySnapshot> task) {
                        if (task.isSuccessful()) {
                            mUserDataTextView.setText("");
                            userList.clear();
                            for (QueryDocumentSnapshot document : Objects.requireNonNull(task.getResult())) {
                                Log.d(TAG, document.getId() + " => " + document.getData());
                                String nameText = document.getString(NAME_KEY);
                                String emailText = document.getString(EMAIL_KEY);
//                                mUserDataTextView.setText("NAME:" + nameText+ "\" EMAIL: "+ emailText + "\"");
                                userList.add("Name: "+ nameText+ " Email: " + emailText + "\n");
                            }
                            Collections.sort(userList);
                            for(String s : userList ){
                                mUserDataTextView.append(s);
                            }

                        } else {
                            Log.w(TAG, "Error getting documents.", task.getException());
                        }

                    }
                });
    }

//    private void showToast (String text) {
//        Toast.makeText(MainActivity.this, text, Toast.LENGTH_SHORT).show();
//    }
}