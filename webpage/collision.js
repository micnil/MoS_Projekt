<!-- fil som innehåller det som rör krocken för tydligare uppdelning.-->
<!-- the game har en funktion som heter collision som sköter det utifrån och den i sin tur anroppar dessa funktioner under-->

<!-- här ha en funktion som kollar kollision! jämför med arrayen allaStenar -->
<!-- setNewDirection and setNewSpeed will be called if collision is between 2 stones-->
function setAfterCollision(stone1,stone2){ <!-- vilken vinkel som stenen ska åka i efter krock-->
	/* Calculates the new velocities after a collision is detected. */

	e=0.3;

/*
	First we have to split the incomming velocities into 2 components, The
	collision_normal component, which is the velocity projected on a line
	between the two centers of the stones. The second one is the
	Tangent_component, which is the on that is ortogonal to the
	normal_component
*/
	var collision_normal = stone2.pos.subtract(stone1.pos);

	var velocity1_normal = collision_normal.multiply((stone1.calcVelocityResultant().dot(collision_normal))/(collision_normal.dot(collision_normal)));
	var velocity1_tangent = stone1.calcVelocityResultant().subtract(velocity1_normal);

	var velocity2_normal = collision_normal.multiply((stone2.calcVelocityResultant().dot(collision_normal))/(collision_normal.dot(collision_normal)));
	var velocity2_tangent = stone2.calcVelocityResultant().subtract(velocity2_normal);

	var velocity1add2_normal=velocity1_normal.add(velocity2_normal);
	var velocity1sub2_normal=velocity1_normal.subtract(velocity2_normal);

 /*We use the conservation of momentum and the a energi loss formula to get this equation.*/
	var velocity1_after_normal = velocity1add2_normal.subtract(velocity1sub2_normal.multiply(e));
	velocity1_after_normal = velocity1_after_normal.multiply(0.5);

	var velocity2_after_normal = velocity1add2_normal.add(velocity1sub2_normal.multiply(e));
	velocity2_after_normal = velocity2_after_normal.multiply(0.5);

/*calculate the new velocity by adding the components again.*/
	var velocity1_after=velocity1_after_normal.add(velocity1_tangent);
	var velocity2_after=velocity2_after_normal.add(velocity2_tangent);

	var speed1 = Math.sqrt( Math.pow(velocity1_after.e(1),2) + Math.pow(velocity1_after.e(2),2) ); 
	var speed2 = Math.sqrt( Math.pow(velocity2_after.e(1),2) + Math.pow(velocity2_after.e(2),2) );

	var direction_forw1 = velocity1_after.toUnitVector();
	var direction_forw2 = velocity2_after.toUnitVector();

/*set on the stones there new speed and new direction */
	stone1.speed = speed1;
	stone2.speed = speed2;
	stone1.directionForward = direction_forw1;
	stone2.directionForward = direction_forw2; 

}

function checkCollision(stone1,stone2){ 

/*We have to check collision BEFORE we move the stones to the  new position.*/
	var predictedStonePos1 = stone1.pos.add(stone1.calcVelocityResultant().multiply(dt));
	var predictedStonePos2 = stone2.pos.add(stone2.calcVelocityResultant().multiply(dt));
/*Distance to check if colision of rock A and B*/
	var distance = Math.sqrt ( Math.pow(predictedStonePos2.e(1) - predictedStonePos1.e(1),2) + Math.pow(predictedStonePos2.e(2) - predictedStonePos1.e(2),2) );
 
	if( distance <= 2*R )
		return true;

	return false;
}

