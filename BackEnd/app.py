from flask import Flask, request, render_template, redirect
import os
import sqlite3


currentlocation = os.path.dirname(os.path.abspath("DATABASE"))

myapp = Flask(__name__)


@myapp.route('/')
def homepage():
    return render_template('homepage.html')


@myapp.route("/", methods =["POST"])
def checkloging():
    UN = request.form['Username']
    PW = request.form['Password']

    sqlconnection = sqlite3.Connection(currentlocation+"\logging.db")
    cursor = sqlconnection.cursor()
    queary1 = "SELECT UserName, Password From Users WHERE UserName={un} AND Password = {pw}".format(un=UN,pw =PW)

    rows = cursor.execute(queary1)
    rows =rows.fetchall()
    if len(rows) ==1:
        return render_template("LoggedIn.html")
        print("Succed")
    else:
        return redirect("/register")
        print("Error")


@myapp.route("/register",methods=["GET","POST"])
def registerpage():
    if request.method == "POST":
        newuser = request.form['newUserName']
        newpw = request.form['newPassword']
        newEmail = request.form['newEmail']
        sqlconnection = sqlite3.Connection(currentlocation+"\logging.db")
        cursor = sqlconnection.cursor()
        query2 = "INSERT INTO Users VALUES('{newuser}','{newpw}','{newEmail}')".format(newuser = newuser,newpw =newpw,newEmail = newEmail)
        cursor.execute(query2)
        sqlconnection.commit()
        return redirect("/")
    return render_template("Register.html")


if __name__ == '__main__':
    myapp.run()
